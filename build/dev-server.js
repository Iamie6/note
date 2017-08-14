require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
   process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
   // automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
   // Define HTTP proxies to your custom API backend
   // https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
   publicPath: webpackConfig.output.publicPath,
   quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: () => {}
   })
   // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
   compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
      hotMiddleware.publish({
         action: 'reload'
      })
      cb()
   })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
   var options = proxyTable[context]
   if (typeof options === 'string') {
      options = {
         target: options
      }
   }
   app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
   _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
   console.log('> Listening at ' + uri + '\n')
      // when env is testing, don't need open it
   if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
   }
   _resolve()
})

var server = app.listen(port)

var UUID = require('uuid')


/*
 * 处理分页数据
 * req 请求报文对象
 * data 返回数据
 */
function pageList(req, data) {
   var path = req.path
   data.page.pageNo = req.query.pageNo
   data.page.pageSize = req.query.pageSize   
   data.list.forEach((item) => {
   let uid = UUID.v4().slice(0, 7)
      if(path.indexOf('/staff/list') > -1) {
         item['staffName'] += '-' + uid + '-' + data.page.pageNo
      }
   })
}

/*
const apiServer = express()
const bodyParser = require('body-parser')
apiServer.use(bodyParser.urlencoded({
   extended: true
}))
apiServer.use(bodyParser.json())
const apiRouter = express.Router()
const fs = require('fs')
apiRouter.route('/*').all((req, res) => {
   var key = req.path
   fs.readFile('./db.json', 'utf8', (err, data) => {
      if (err) throw err
      var data = JSON.parse(data)[key]
      if (data) { //兼容分页情况
         data.data.page && pageList(req, data.data)
         res.json(data)
      } else {
         res.send('no such api name')
      }
   })
})

apiServer.use('/admin', apiRouter)
apiServer.use('/v1', apiRouter)
apiServer.listen(port + 1, function(err) {
   if (err) {
      console.log(err)
      return
   }
   console.log('apiServer Listening at http://localhost:' + (port + 1) + '\n')
})
*/
var api = require('../service/index')


module.exports = {
   ready: readyPromise,
   close: () => {
      server.close()
   }
}