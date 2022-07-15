import count from "./js/sum"
import sum from "./js/count"
// 要打包就要引入
import "./css/index.css"
import "./less/index.less"
import "./css/iconfont.css"

console.log(count(1, 2))
console.log(sum(1, 2, 3, 4))

let result1 = count(2, 1);
console.log(result1);
let result2 = sum(1, 2, 3, 4);
console.log(result2);