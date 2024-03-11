import fs from 'node:fs/promises';
import path from "node:path";

const f = async ({__dirname, config}) => {
  if (!config.enableManyEntries) {
    return path.join(__dirname, `src/js/app.js`);
  }

  const obj = {};

  const getFileName = (file) => {
    const regexp = /\w+\./g;
    const replaceRegEx = /[/.]/g;
    return file.match(regexp)[0].replace(replaceRegEx, ``);
  };
  try {
    const entryFiles = await fs.readdir(path.join(__dirname, 'src/js/entry'));

    entryFiles.forEach((file) => {
      obj[getFileName(file)] = [path.join(__dirname, `src/js/entry/${file}`), config.scssEntry]
    })

    return obj;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export default f;
