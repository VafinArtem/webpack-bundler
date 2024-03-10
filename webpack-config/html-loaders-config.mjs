import path from "node:path";

export default ({__dirname, mode}) => ({
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
})
