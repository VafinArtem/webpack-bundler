import path from "node:path";
import {fileURLToPath} from "node:url";
import htmlPluginsConfig from "./webpack-config/html-plugins-config.mjs";
import stylePluginsConfig from "./webpack-config/style-plugins-config.mjs";
import htmlLoadersConfig from "./webpack-config/html-loaders-config.mjs";
import styleLoadersConfig from "./webpack-config/style-loaders-config.mjs";
import commonConfig from "./webpack-config/common-config.mjs";
import entryConfig from "./webpack-config/entry-config.mjs";
import copyPluginsConfig from "./webpack-config/copy-plugins-config.mjs";
import webpPluginsConfig from "./webpack-config/webp-plugins-config.mjs";
import jsLoadersConfig from "./webpack-config/js-loaders-config.mjs";

export default async () => {
  const mode = process.env.NODE_ENV || "development";
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const config = commonConfig({__dirname});

  const entry = await entryConfig({__dirname, config});

  return {
    mode,

    entry,

    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
        watch: true,
      },
      watchFiles: [path.join(__dirname, "src")],
      compress: true,
      port: 9000,
      hot: true,
      open: true,
    },

    output: {
      clean: mode !== "production" ? true : {
        keep(asset) {
          return asset.includes("img");
        },
      },
      filename: config.enableManyEntries ? "js/[name].bundle.js" : "js/main.bundle.js",
      path: path.join(__dirname, `${mode === "production" ? config.outputPath.prod : config.outputPath.dev}`),
    },

    module: {
      rules: [
        jsLoadersConfig({__dirname, mode}),
        htmlLoadersConfig({__dirname, mode}),
        styleLoadersConfig({__dirname, mode}),
      ],
    },

    resolveLoader: {
      modules: [
        "node_modules",
        path.resolve(__dirname, "webpack-loaders"),
      ],
    },

    plugins: [
      ...await htmlPluginsConfig(),
      ...stylePluginsConfig({mode}),
      ...copyPluginsConfig({mode, __dirname}),
      ...webpPluginsConfig({mode}),
    ],
  };
}
