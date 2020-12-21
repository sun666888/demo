// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = { 
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/wxunicom/terminal_shop/home/',
        // assetsPublicPath: '/orderschedule/orderschedule_php/',
        productionSourceMap: false, 
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
        // cdn
        cdn: {
            css: [
                "https://unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css",
            ],
            js: [
                "https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.min.js",
                "https://cdn.jsdelivr.net/npm/vue-router@2.5.3/dist/vue-router.min.js",
                "https://unpkg.com/element-ui@2.4.11/lib/index.js",
                "https://cdn.jsdelivr.net/npm/axios@0.17.1/dist/axios.min.js",
                "https://cdn.bootcss.com/lodash.js/4.17.11/lodash.core.js",
                "https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js"
            ]
        },
        //cdn
    },
    dev: {
        env: require('./dev.env'),
        port: 8000,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/settlement/': {
                target: 'http://47.100.177.141/',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
            // '/api': {
            //     target: 'http://zzbn.s1.natapp.cc',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
        cdn: {
            css: [
                "https://unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css"
            ],
            js: []
        }
    }
}
