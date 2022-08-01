const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TestPlugin = require("./plugins/test-plugin")
const BannerWebpackPlugin = require("./plugins/banner-webpack-plugin")
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin")
const AnalyzeWebpackPlugin = require("./plugins/analyze-webpack-plugin")

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    // clean: true
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: "./loaders/test-loader.js"
      // }
      {
        test: /\.js$/,
        // 从右到左，从下到上
        // use: ["./loaders/demo/test1", "./loaders/demo/test2", "./loaders/demo/test3"]
        // use: ["./loaders/demo/test4", "./loaders/demo/test5", "./loaders/demo/test6"]
        loader: "./loaders/clean-log-loader.js"
      },
      // {
      //   test: /\.js$/,
      //   loader: "./loaders/banner-loader",
      //   options: {
      //     author: "ljk"
      //   }
      // },
      {
        test: /\.js$/,
        loader: "./loaders/babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "./loaders/file-loader",
        type: "javascript/auto", // 解决图片重复打包问题
        options: {
          outputPath: "images/"
        }
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"]
        use: ["./loaders/style-loader", "css-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html")
    }),
    // new TestPlugin(),
    new BannerWebpackPlugin({
      author: "ljk"
    }),
    new CleanWebpackPlugin(),
    new AnalyzeWebpackPlugin()
  ],
  performance: {
    hints: false,
  },
  mode: "production"
}