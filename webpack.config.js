const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin') // 多线程打包

module.exports = {
  entry: {
    index: './src/index.js',
    about: './src/about.js',
    common: './src/common.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['common', 'index'],
      hash: true, // 会在引入的js里加入查询字符串避免缓存
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'about.html',
      chunks: ['common', 'about'],
      hash: true, // 会在引入的js里加入查询字符串避免缓存
    })
  ],
  devServer: {
    contentBase: './dist',
    port: 8000,
    open: true,
    compress: true,
    inline: true,
		hot: true,
    historyApiFallback: true //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
  }
}