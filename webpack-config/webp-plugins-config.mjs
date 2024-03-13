import path from "node:path";
import CopyPlugin from "copy-webpack-plugin";
import ImageminWebpWebpackPlugin from "imagemin-webp-webpack-plugin";

export default ({mode}) => {
  return [mode === `development` ? new ImageminWebpWebpackPlugin() : null]
}
