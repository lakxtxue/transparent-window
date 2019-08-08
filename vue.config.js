const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  devServer: {
    // can be overwritten by process.env.HOST
    host: "0.0.0.0",
    port: 8090
  },
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/scss/base.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("src", resolve("src"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"));

    ["vue-modules", "vue", "normal-modules", "normal"].forEach(match => {
      config.module
        .rule("sass")
        .oneOf(match)
        .use("sass-loader")
        .tap(opt =>
          Object.assign(opt, { data: `@import '~@/assets/scss/base.scss'` })
        );
    });
  }
};
