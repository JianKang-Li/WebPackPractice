const loaderUtils = require("loader-utils");

module.exports = function (content) {
  // 1、根据文件内容生成带hash值的文件名
  const filename = loaderUtils.interpolateName(this, "[hash].[ext]", {
    content,
  });
  // console.log(filename)
  // 2、将文件输出
  this.emitFile(filename, content);
  // 3、返回：module.exprots="文件路径（文件名）"
  return `module.exports= '${filename}'`;
}

// 处理图片和字体等文件，都是buffer数据
// 使用Raw Loader
module.exports.raw = true