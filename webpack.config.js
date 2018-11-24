const path    = require('path')
const webpack = require('webpack');

module.exports = {
  entry: './lib/bundle.js',
  output: {
    filename: 'ZIPmoji.min.js',
    path:     path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader', options: { name: "ZIPmoji.worker.js" }},
      }
    ]
  },

  target: "web",

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true,
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      },
    })
  ]
}