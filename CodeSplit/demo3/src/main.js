import { sum } from "./math"
// 直接引入没有按需加载
// import count from "./count"
console.log("hello main")
console.log(sum(1, 2, 3, 4))
document.getElementById("btn").onclick = function () {
  //  import 动态导入,会将动态导入的文件代码分割（拆分成单独模块），在需要使用时自动加载
  import("./count")
    .then((res) => {
      console.log("模块加载成功", res.default(2, 1))
    })
    .catch((error) => {
      console.log("失败" + error)
    })
}