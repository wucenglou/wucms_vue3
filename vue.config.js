// vue.config.js

const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",//根路径 cli3.0以上使用publicPath
    outputDir: 'wucms',//打包的时候生成的一个文件名

    devServer: {
        host: "localhost",
        port: 8080,
        https: false,
        open: true,
        proxy: {
            //名字可以自定义，用于指定哪些请求需要被 target 对应的主机代理
            // 当前 devServer 的地址是 localhost:8080 , 需要代理的地址是 localhost:3000
            '/api/': {
                target: 'http://wucms.com/', //设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true, //这里设置是否跨域
                pathRewrite: { // 路径重写
                    '^/api': '/api'
                }
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = "production";


        } else {
            // 为开发环境修改配置...
            config.mode = 'development';



        }
        Object.assign(config, {
            resolve: {
                extensions: [".js", ".vue", ".json"], //文件优先解析后缀名顺序
                alias: {
                    '@': resolve('src'),
                }, // 别名配置
                plugins: []
            },
        })
    },
    chainWebpack: config => {

        // 添加新的svg-sprite-loader处理svgIcon
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });


    }
}