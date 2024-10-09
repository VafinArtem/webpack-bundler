import HtmlWebpackPlugin from "html-webpack-plugin";
import fs from 'node:fs/promises';

const f = async ({config}) => {
  const arr = [];
  try {
    if (!config.enableManyEntries) {
      const files = await fs.readdir(`src/html/entry/`);

      files.forEach((html) => {
        arr.push(new HtmlWebpackPlugin({
          filename: html,
          template: `src/html/entry/${html}`,
          inject: 'body',
          minify: false,
        }));
      });
    } else {
      const entryCatalogs = await fs.readdir('src/html/entry');

      for (const entryCatalog of entryCatalogs) {
        const files = await fs.readdir(`src/html/entry/${entryCatalog}/`);

        files.forEach((html) => {
          arr.push(new HtmlWebpackPlugin({
            filename: html,
            template: `src/html/entry/${entryCatalog}/${html}`,
            chunks: [entryCatalog],
            inject: 'body',
            minify: false,
          }));
        });
      }
    }

    return arr;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default f;
