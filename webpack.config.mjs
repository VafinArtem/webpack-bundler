import path from "node:path";
import {fileURLToPath} from 'node:url';
import htmlConfig from "./webpack-config/html-config.mjs";


export default async (env) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  return {
    mode: 'development',

    entry: {
      app: path.join(__dirname, 'src/js/entry/app.js'),
      catalog: path.join(__dirname, 'src/js/entry/catalog.js'),
    },

    output: {
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: "handlebars-loader",
              options: {
                rootRelative: path.join(__dirname, './src/html/'),
                partialDirs: [
                  path.join(__dirname, 'src/html/content', '*', '*.html'),
                  path.join(__dirname, 'src/html/module', '*', '*.html'),
                ]
              }
            }
          ]
        }
      ],
    },

    plugins: [...await htmlConfig()],
  }
}
