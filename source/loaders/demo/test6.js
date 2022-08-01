module.exports = function (content) {
  console.log("normal loader3")
  return content;
}

// 在loader执行之前开始执行
module.exports.pitch = function () {
  console.log("pitch loader3")
}