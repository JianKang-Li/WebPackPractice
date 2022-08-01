// plugins/inline-chunk-webpack-plugin.js
const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");

class InlineChunkWebpackPlugin {

  constructor(tests) {
    this.tests = tests
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("InlineChunkWebpackPlugin", (compilation) => {
      // 获取html-webpack-plugin的hooks
      const hooks = HtmlWebpackPlugin.getHooks(compilation);
      // 注册hooks
      hooks.alterAssetTagGroups.tap("InlineChunkWebpackPlugin", (assets) => {
        // console.log(assets.headTags, assets.bodyTags)
        assets.headTags = this.getInlineTag(assets.headTags, compilation.assets);
        assets.bodyTags = this.getInlineTag(assets.bodyTags, compilation.assets);
      });

      // 删除文件
      hooks.afterEmit.tap("InlineChunkHtmlPlugin", () => {
        Object.keys(compilation.assets).forEach((filepath) => {
          if (this.tests.some((test) => filepath.match(test))) {
            delete compilation.assets[filepath];
          }
        });
      });
    });
  }

  getInlineTag(tags, assets) {
    /* 
      [
        {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-webpack-plugin' },
          attributes: { defer: true, type: undefined, src: 'js/main.js' }
        }
        修改为
        {
          tagName: 'script',
          innerHtml:runtime文件内容,
          closeTag:true
        }
      ]
    */
    return tags.map((tag) => {
      if (tag.tagName !== "script") return tag;

      const filepath = tag.attributes.src;

      if (!filepath) return tag;

      if (!this.tests.some((test) => filepath.match(test))) return tag;

      return { tagName: "script", innerHTML: assets[filepath].source(), closeTag: true };
    });
  }
}

module.exports = InlineChunkWebpackPlugin;
