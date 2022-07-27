// Rawloader

/* 
接受到的content是Buffer数据,
一般用于处理图片，字体图标等资源
*/
// module.exports = function (content) {
//   console.log(content)
//   return content;
// }

// module.exports.raw = true

function Test3Loader(content) {
  return content
}

Test3Loader.row = true

module.exports = Test3Loader