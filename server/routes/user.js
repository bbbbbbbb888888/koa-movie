const mongoose = require('mongoose')
const {controller, get, post, put} = require('../lib/decorator')
const { checkPassword } = require('../service/user')

@controller('/api/v0/user')
export class userController {
  @post('/')
  async login (ctx, next) {
    const {email, password} = ctx.request.body
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        err: '用户不正确'
      })
    }

    if (matchData.match) {
      return (ctx.body = {
        success: true
      })
    }

    return (ctx.body = {
      success: false,
      err: '密码不正确'
    })
  }
}
