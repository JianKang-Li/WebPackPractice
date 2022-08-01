class AnalyzeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("AnalyzeWebpackPlugin", compilation => {
      // 遍历所有输出文件得到其大小
      // 将对象变为二维数组
      const assets = Object.entries(compilation.assets)

      let content = `# 资源分析\n\n| 资源名 | 资源大小 |\n| --- | --- |`

      assets.forEach(([filename, file]) => {
        content += `\n| ${filename} | ${Math.ceil(file.size() / 1024)}kb |`
      })
      // 生成一个md文件
      compilation.assets["analyze.md"] = {
        source() {
          return content + "\n"
        },
        size() {
          return content.length
        }
      }

    })
  }
}


module.exports = AnalyzeWebpackPlugin