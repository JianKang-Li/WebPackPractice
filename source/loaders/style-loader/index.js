module.exports = function (content) {



  /* 
    1、不使用css-loader出现其他资源路径问题，
    2、使用css-loader返回为js代码无法使用 
  */
  // const script = `
  // const styleEl=document.createElement("style")
  // styleEl.innerHTML=${JSON.stringify(content)};
  // document.head.appendChild(styleEl);
  // `


  // return script;
}


module.exports.pitch = function (remainingRequest) {
  /**
 * @remainingRequest 剩余请求
 * @precedingRequest 前置请求
 * @data 数据对象
 */

  // remainingRequest 剩下还需要处理的loader
  // console.log(remainingRequest)//F:\git\WebPackPractice\loader\node_modules\css-loader\dist\cjs.js!F:\git\WebPackPractice\loader\src\css\index.css
  // 1、将绝对路径改为相对路径
  // ..\..\loader\node_modules\css-loader\dist\cjs.js!.\index.css
  const relativePath = remainingRequest.split("!").map(absolutePath => {
    // 返回相对路径
    return this.utils.contextify(this.context, absolutePath)
  }).join("!")
  // console.log(relativePath)//../../node_modules/css-loader/dist/cjs.js!./index.css

  //引入css-loader处理好的资源
  // 创建style标签，将内容插入到页面中
  const script = `
  import style from "!!${relativePath}"
  const styleEl=document.createElement("style")
  styleEl.innerHTML=style;
  document.head.appendChild(styleEl);
  `

  // 终止后面的loader执行
  return script;
}