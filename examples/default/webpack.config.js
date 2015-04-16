var path = require('path');

module.exports = {
  entry: './app.jsx.js',
  target: 'web',
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.webpack.js',
    chunkFilename: '[chunkhash].js'
  },
  resolve: {
    modulesDirectories: ['../../node_modules']
  },
  module: {
    loaders: [
      {
        test: /(\.jsx\.js$/,
        loader: 'jsx-loader'
      }
    ],
    noParse: /\.min\.js/
  }
}
