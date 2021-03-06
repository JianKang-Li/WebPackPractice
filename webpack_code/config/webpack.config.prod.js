const os = require("os")
const path = require("path")
// 导入插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");

// cpu核数
const threads = os.cpus().length;


// 获取处理样式loader
function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre,
  ].filter(Boolean);
}



module.exports = {
  // 入口
  entry: "./src/main.js",//相对路径
  // 输出
  output: {
    // 输出路径,所有打包的文件输出目录
    path: path.resolve(__dirname, "../dist"),//绝对路径
    // 输出名称,入口文件打包输出的文件名
    // [contenthash:8]使用contenthash，取8位长度
    filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
    // 统一给静态资源命名通过type:"asset"处理
    assetModuleFilename: 'static/media/[hash:10][ext][query]',
    // 自动清空上次打包结果
    // 打包前将path目录清空
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      {
        oneOf: [

          {
            //只检测xxx文件
            test: /\.css$/,
            // 使用什么loader，执行顺序（从下到上）
            // use: [
            // _  // 将js中的css通过创建style标签添加到html文件中生效
            //   "style-loader",
            //   // 将css资源编译成commonjs的模块到js中
            //   "css-loader"],
            use: getStyleLoader(),
          },
          {
            //只检测xxx文件
            test: /\.less$/,
            // 使用什么loader，执行顺序（从下到上）
            // use: [
            //   // 将js中的css通过创建style标签添加到html文件中生效
            //   "style-loader",
            //   // 将css资源编译成commonjs的模块到js中
            //   "css-loader",
            //   // 将less文件编译成css文件
            //   "less-loader"],
            use: getStyleLoader("less-loader"),
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
            // generator: {
            //   //输出图片名称 :10代表取前十位hash值
            //   filename: 'static/images/[hash:10][ext][query]'
            // }
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            // 原封不动输出
            type: 'asset/resource',
            // generator: {
            //   //输出名称 
            //   filename: 'static/media/[hash:10][ext][query]'
            // }
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

            // options: {
            //   presets: ["@babel/preset-env"]
            // }
          }
        ]
      }
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",//默认值
      threads, // 开启多进程和进程数量
      cache: true, // 开启缓存
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
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    // css压缩
    // new CssMinimizerPlugin(),
    // 多进程
    // new TerserPlugin({
    //   parallel: threads // 开启多进程
    // })
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      // rel: 'prefetch' // prefetch兼容性更差
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
    }),
  ],
  optimization: {
    // 压缩操作
    minimize: true,
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他内容用默认配置即可
    },
    // 提取runtime文件
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`, // runtime文件命名规则
    },
  },
  // 关闭warning
  performance: {
    hints: false,
  },
  // 模式
  mode: "production",
  // 设置devtool
  devtool: "source-map",
};
