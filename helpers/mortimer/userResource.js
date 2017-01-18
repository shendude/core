const Users = require('../../models/Users')
const mortimer = require('mortimer')
const AfterResourceHook = require('./afterResourceHook')
class UserResource extends AfterResourceHook {
  constructor () {
    super(Users)
  }
  // This method implements the counting routine.
  after (tag) {
    // console.log('arguments', arguments, this)
    if (!this.counters) {
      this.counters = {}
    }
    if (!this.counters[tag]) {
      this.counters[tag] = 0
    }
    var that = this
    return function (req, res, next) {
      // console.log('running', req.mrt.result, req.user)
      // TODO: edit req.mrt.result to sanitize returns
      req.mrt.result = req.mrt.result.map((user) => {
        user = user.toObject()
        delete user.jwt
        delete user.tokens
        return user
      })
      next()
    }
  }
}
const userResource = new UserResource(Users)

module.exports = userResource