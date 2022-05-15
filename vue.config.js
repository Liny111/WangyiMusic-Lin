const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
    pages:{
      index:{
        entry:"src/main.js",
        title:'老林音乐'
      }
    }
})

