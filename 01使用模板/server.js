/**
 * Created by yanjd on 2017/7/25.
 */
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const createApp = require('./app')
const context = {
  title: 'vue-ssr',
  meta: `
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  `
}

server.get('*', (req, res) => {
  const data = { url: req.url }
  const app = createApp(data)
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8080)