const path = require("path")

module.exports = {
  // 入口
  entry: "./src/main.js",//相对路径
  // 输出
  output: {
    // 输出路径
    path: path.resolve(__dirname, "dist"),//绝对路径
    // 输出名称
    filename: "main.js"
  },
  // 加载器
  module: {
    rules: [
      {
        //只检测xxx文件
        test: /\.css$/,
        // 使用什么loader，执行顺序（从下到上）
        use: [
          // 将js中的css通过创建style标签添加到html文件中生效
          "style-loader",
          // 将css资源编译成commonjs的模块到js中
          "css-loader"],
      },
      {
        //只检测xxx文件
        test: /\.less$/,
        // 使用什么loader，执行顺序（从下到上）
        use: [
          // 将js中的css通过创建style标签添加到html文件中生效
          "style-loader",
          // 将css资源编译成commonjs的模块到js中
          "css-loader",
          // 将less文件编译成css文件
          "less-loader"],
      }
    ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",
};
