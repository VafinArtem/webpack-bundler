import path from "node:path";
import CopyPlugin from "copy-webpack-plugin";

export default ({__dirname, mode}) => {
  return [mode === `development` ? new CopyPlugin({
    patterns: [
      { from: path.join(__dirname, "src/assets"), to: path.join(__dirname, "dist") },
    ],
  }) : null]
}
