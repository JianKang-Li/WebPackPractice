import sum from "./js/sum"
import count from "./js/count"
// 要打包就要引入
import "./css/index.css"
import "./less/index.less"
import "./css/iconfont.css"
import { mul } from "./js/math"
console.log(count(1, 2, 3))
console.log(sum(1, 2, 3, 4, 5))

console.log(mul(3, 3))
let result1 = count(2, 1);
console.log(result1);
let result2 = sum(1, 2, 3);
console.log(result2);

// js实现热模块替换
if (module.hot) {
  // 判断是否支持热模块替换
  module.hot.accept("./js/count")
  module.hot.accept("./js/sum")
}