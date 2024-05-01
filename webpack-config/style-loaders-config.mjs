import path from "node:path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default ({__dirname, mode}) => ({
  test: /\.s[ac]ss$/i,
  use: [
    mode !== "production"
      ? "style-loader"
      : {
        loader: MiniCssExtractPlugin.loader,
      },
    {
      loader: "css-loader",
      options: {
        url: mode !== "production",
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            [
              "autoprefixer",
              {
                // Options
              },
            ]
          ],
        },
      },
    },
    mode !== "production"
      ? null
      : {
        loader: 'fix-css-url-loader',
      },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
        sassOptions: {
          includePaths: [path.join(__dirname, 'src/style/app.scss')],
        },
      },
    },
  ],
})
