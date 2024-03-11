import path from "node:path";

export default ({__dirname}) =>( {
  styleEntry: path.join(__dirname, 'src/style/app.scss'),
  outputPath: {
    prod: 'build/',
    dev: 'dist/'
  },
  enableManyEntries: true,
})
