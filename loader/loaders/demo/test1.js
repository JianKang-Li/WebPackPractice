// 同步loader

// module.exports = function (content) {
//   return content;
// }

module.exports = function (content, map, meta) {
  console.log("test1")
  /* 
  第一个参数：err 是否有错误
  第二个参数：content 处理后的内容
  第三个参数：SourceMap 继续传递source-map
  第四个参数：给其他loader传递的参数
  */
  this.callback(null, content, map, meta)
}