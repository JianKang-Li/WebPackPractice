import "core-js/es/promise";
import sum from "./js/sum"
import count from "./js/count"
// 要打包就要引入
import "./css/index.css"
import "./less/index.less"
import "./css/iconfont.css"
// import { mul } from "./js/math"
console.log(count(1, 2, 3))
console.log(sum(1, 2, 3, 4, 5))

// console.log(mul(3, 3))
let result1 = count(2, 1);
console.log(result1);
let result2 = sum(1, 2, 3);
console.log(result2);

document.getElementById("btn").onclick = function () {
  // Eslint不识别动态导入语法
  // /* webpackChunkName:"math" */ webpack魔法命名
  import(/*webpackChunkName:"math"*/"./js/math").then(({ mul }) => {
    console.log(mul(3, 3))
  }).catch((error) => {
    console.log("错误", error)
  })
}

// js实现热模块替换
if (module.hot) {
  // 判断是否支持热模块替换
  module.hot.accept("./js/count")
  module.hot.accept("./js/sum")
}

// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log("hello promise");
});

const arr = [1, 2, 3, 4]
console.log(arr.includes(1))

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}