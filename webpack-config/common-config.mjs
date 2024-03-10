import path from "node:path";

export default ({__dirname, mode}) =>( {
  scssEntry: path.join(__dirname, 'src/style/app.scss'),
})
