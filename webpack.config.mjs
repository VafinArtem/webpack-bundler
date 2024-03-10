import path from "node:path";
import {fileURLToPath} from 'node:url';
import htmlPluginsConfig from "./webpack-config/html-plugins-config.mjs";
import stylePluginsConfig from "./webpack-config/style-plugins-config.mjs";
import htmlLoadersConfig from "./webpack-config/html-loaders-config.mjs";
import styleLoadersConfig from "./webpack-config/style-loaders-config.mjs";
import commonConfig from "./webpack-config/common-config.mjs";

export default async (env, argv) => {
  const mode = process.env.NODE_ENV || 'development';
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const config = commonConfig({__dirname, mode});

  return {
    mode,

    entry: {
      app: [path.join(__dirname, 'src/js/entry/app.js'), config.scssEntry],
      catalog: [path.join(__dirname, 'src/js/entry/catalog.js'), config.scssEntry],
    },

    output: {
      clean: true,
      filename: '[name].bundle.js',
      path: `${__dirname}${mode === 'production' ? '/build' : '/dist'}`,
    },

    module: {
      rules: [
        htmlLoadersConfig({__dirname, mode}),
        styleLoadersConfig({__dirname, mode}),
      ],
    },

    plugins: [...await htmlPluginsConfig(), ...stylePluginsConfig({mode})],
  }
}
