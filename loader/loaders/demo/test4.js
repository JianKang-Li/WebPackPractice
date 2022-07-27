module.exports = function (content) {
  console.log("normal loader1")
  return content;
}

// 在loader执行之前开始执行
module.exports.pitch = function () {
  console.log("pitch loader1")
}

/* 
use    1,2,3 （normal loader）
pitch  1,2,3
执行顺序：pitch1，pitch2，pitch3，loader3，loader2，loader1
*/