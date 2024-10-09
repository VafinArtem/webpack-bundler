import MiniCssExtractPlugin from "mini-css-extract-plugin";

const f = ({mode}) => {
  if (mode !== 'production') {
    return [];
  }

  return [new MiniCssExtractPlugin({
    filename: 'css/style.css'
  })]
};

export default f;
