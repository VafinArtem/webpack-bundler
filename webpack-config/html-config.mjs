import HtmlWebpackPlugin from "html-webpack-plugin";
import fs from 'node:fs/promises';

const f = async () => {
  const arr = [];
  try {
    const entryCatalogs = await fs.readdir('src/html/entry');

    for (const entryCatalog of entryCatalogs) {
      const files = await fs.readdir(`src/html/entry/${entryCatalog}/`);

      files.forEach((html) => {
        arr.push(new HtmlWebpackPlugin({
          filename: html,
          template: `src/html/entry/${entryCatalog}/${html}`,
          chunks: [entryCatalog],
          inject: 'body'
        }));
      });
    }

    return arr;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default f;
