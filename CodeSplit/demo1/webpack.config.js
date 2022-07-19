const path = require("path")
const HtmlwebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // entry:"./src/main.js"//只有一个入口文件叫单入口
  entry: {//多入口
    app: "./src/app.js",
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"//webpack中的命名方式[name]以文件名自己命名
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html")
    })
  ],
  mode: "production"
}