/* global require, module, process, path */

var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.config')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function(compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
//         hotMiddleware.publish({
//             action: 'reload'
//         })
//         cb()
//     })
// })

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
var history = require('connect-history-api-fallback')
app.use(
    history({
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        rewrites: [
            { from: 'index', to: '/index.html' },
            { from: /\/backend/, to: '/admin.html' },
            { from: /^\/backend\/.*$/, to: '/admin.html' }
        ]
    })
)

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
