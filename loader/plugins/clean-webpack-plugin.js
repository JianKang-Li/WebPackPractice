class CleanWebpackPlugin {

  apply(compiler) {
    // 2、获取打包输出目录
    const outputPath = compiler.options.output.path
    const fs = compiler.outputFileSystem
    // 1、注册钩子
    compiler.hooks.emit.tapAsync("CleanWebpackPlugin", (compilation, callback) => {
      const err = this.removeFiles(fs, outputPath)
      callback(err)
    })
  }


  removeFiles(fs, filepath) {
    try {
      // 删除目录前需先删除资源才能删除目录
      // 读取目录下所有资源
      const files = fs.readdirSync(filepath)
      // console.log(files)

      // 遍历删除
      // 遍历文件判断类型（文件夹或文件）
      // 文件直接删除，文件夹删除文件夹下文件后删除文件夹
      files.forEach(file => {
        const path = `${filepath}/${file}`;
        const filestat = fs.statSync(path)
        // console.log(filestat)
        if (filestat.isDirectory()) {
          this.removeFiles(fs, path)
        } else {
          fs.unlinkSync(path)
        }
      })
    }
    catch (e) {
      return e
    }
  }
}

module.exports = CleanWebpackPlugin;