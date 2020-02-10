'use strict'

// Binding Model
const User = use('App/Models/User')

class UserController {
  async getList() {
    return User.all()
  }
  async create({ request, response }) {
    try {
      const user = new User()
      const body = request.post()
      user.email = body.email
      user.password = body.password
      await user.save()
      return response.send("success")
    } catch (e) {
      return response.status(500).send(e)
    }
  }
}

module.exports = UserController
