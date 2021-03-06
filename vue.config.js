module.exports = {
  // 项目打包生成目录
  outputDir: "dist",
  // 静态资源生成目录（相对于outputDir
  assetsDir: "static",
  // 关闭线上源码
  productionSourceMap: false,
  // css相关配置
  // 图片在10kb以内使用内联base64图片
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10240 }));
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // template from
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // htmlWebpackPlugin.options.title 网页title
      title: "海南菜篮子"
    }
  },
  // 部署应用包时的基本 URL(解决build打包后资源文件404问题) :https://cli.vuejs.org/zh/config/#baseurl
  publicPath: "./",
  devServer: {
    open: true,
    compress: true,
    port: 8020,
    https: false,
    hotOnly: false,
    proxy: {
      "/mock": {
        target: "http://mock-api.com/mnE66LKJ.mock/vas",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/mock": ""
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    before: app => {}
  },
  // 关闭生产环境console
  configureWebpack(config) {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  }
};
