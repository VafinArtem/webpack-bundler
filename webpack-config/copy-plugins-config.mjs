import path from "node:path";
import CopyPlugin from "copy-webpack-plugin";

export default ({__dirname, mode}) => {
  return [mode === `development` ? new CopyPlugin({
    patterns: [
      { from: path.join(__dirname, "src/assets"), to: path.join(__dirname, "dist"), force: true, noErrorOnMissing: true },
    ],
  }) : new CopyPlugin({
    patterns: [
      { from: path.join(__dirname, "src/assets"),filter: async (resourcePath) => {
          if (resourcePath.includes("/img/") && !resourcePath.includes("sprite.svg")) {
            return false;
          }

          return true;
        }, to: path.join(__dirname, "build"), force: true, noErrorOnMissing: true },
    ],
  })]
}
