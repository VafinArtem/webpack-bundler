import path from "node:path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default ({__dirname, mode}) => ({
  test: /\.s[ac]ss$/i,
  use: [
    mode !== "production"
      ? "style-loader"
      : MiniCssExtractPlugin.loader,
    "css-loader",
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
            ],
          ],
        },
      },
    },
    {
      loader: "sass-loader",
      options: {
        sassOptions: {
          includePaths: [path.join(__dirname, 'src/style/app.scss')],
        },
      },
    },
  ],
})
