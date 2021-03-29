const path = require('path');

module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // svg使用svg-sprite-loader
    chainWebpack(config) {
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear(); // 清除已有的loader
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/assets/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
    },
    css: {
        loaderOptions: {
            less: {
                globalVars: {
                    hack: "true; @import '~@/assets/css/variable.less';" // 设置全局css变量
                },
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 7000,
        https: false,
        hotOnly: false
        // proxy: {
        //     '/api': {
        //         // target: 'http://49.235.220.14:7689/',
        //         target: 'http://localhost:80/',
        //         ws: true,
        //         changOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
    }
};
