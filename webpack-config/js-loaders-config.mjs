export default ({__dirname, mode}) => ({
  test: /\.(?:js|mjs|cjs)$/,
  exclude: /node_modules/,
  use: mode === `production` ? [
    {
      loader: "babel-loader",
      options: {
        presets: [
          ["@babel/preset-env", {targets: "defaults"}],
        ],
        plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-private-methods"],
      },
    },
  ] : [],
})
