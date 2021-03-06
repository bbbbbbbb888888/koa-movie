const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const {resolve} = require('path')
const {connect, initSchemas} = require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['parcel','router']

const useMiddlewares = (app) => {
  R.map(R.compose(
      R.forEachObjIndexed(
          initWith => initWith(app)
        ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    ))(MIDDLEWARES)
}

;(async () => {
  await connect()

  initSchemas()
  // require('./tasks/movie')
  // require('./tasks/api')
  // require('./tasks/trailer')
  const app = new Koa()
  await useMiddlewares(app)


  app.listen(2333)
})()


