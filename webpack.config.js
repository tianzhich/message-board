module.exports = {
  entry: {
    index: `./src/index.js`
  },
  output: {
    path: `${__dirname}/dist/`,
    publicPath: `/message-board/`,
    filename: `[name].bundle.js`,
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }/* ,
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      } */
    ]
  },
  devServer: {
    contentBase: `./dist`
  }
}