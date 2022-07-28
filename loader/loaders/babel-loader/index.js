const babel = require("@babel/core")
const schema = require("./schema.json")

module.exports = function (content) {
  const callback = this.async()
  const options = this.getOptions(schema)
  // 使用babel对代码进行编译转换
  babel.transform(content, options, function (err, result) {
    callback(err, result.code);
  });
}