module.exports = {
  // 智能预设，能编译ES6
  presets: [
    ["@babel/preset-env",
      // 按需加载core-js的polyfill
      {
        useBuiltIns: "usage",
        corejs: 3
      }
    ],
  ],
}