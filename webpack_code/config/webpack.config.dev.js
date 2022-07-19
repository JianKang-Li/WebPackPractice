const os = require("os")
const path = require("path")
// 导入插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin")

// cpu核数
const threads = os.cpus().length;

module.exports = {
  // 入口
  entry: "./src/main.js",//相对路径
  // 输出
  output: {
    // 输出路径,所有打包的文件输出目录
    // path: path.resolve(__dirname, "dist"),//绝对路径
    path: undefined,//开发模式无输出
    // 输出名称,入口文件打包输出的文件名
    filename: "static/js/main.js",
    // 自动清空上次打包结果
    // 打包前将path目录清空
    // 开发模式下没有输出则不需要清除
    // clean: true,
  },
  // 加载器
  module: {
    rules: [
      {
        // 每个文件只能被一个loader处理
        oneOf: [{
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
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              // 小于10kb转base64
              // 减少请求数量，体积会变大一点
              maxSize: 10 * 1024 // 10kb
            }
          },
          generator: {
            //输出图片名称 :10代表取前十位hash值
            filename: 'static/images/[hash:10][ext][query]'
          }
        },
        {
          test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
          // 原封不动输出
          type: 'asset/resource',
          generator: {
            //输出名称 
            filename: 'static/media/[hash:10][ext][query]'
          }
        },
        {
          test: /\.js$/,
          // exclude: /node_modules/, // 排除node_modules代码不编译
          include: path.resolve(__dirname, "../src"), // 也可以用包含
          use: [
            {
              loader: "thread-loader", // 开启多进程
              options: {
                workers: threads, // 进程数量
              },
            },
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true, // 开启babel编译缓存
                cacheCompression: false, // 缓存文件不要压缩
                plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
              },
            }
          ],

        }]
      }
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",//默认值
      cache: true, // 开启缓存
      threads, // 开启多进程和进程数量
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlwebpackPlugin({
      // 模板
      template: path.resolve(__dirname, "../public/index.html")
    }),
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了,默认为true）
  },
  // 模式
  mode: "development",
  // 设置devtool
  devtool: "cheap-module-source-map",
};
