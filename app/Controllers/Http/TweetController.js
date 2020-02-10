'use strict'

// Binding the model
const Tweet = use('App/Models/Tweet')

class TweetController {
  async list({ auth }){
    return await Tweet.all()
  }
  async create({ auth, request, response }){
    try {
      const body = request.post()

      const tweet = new Tweet()
      tweet.body = request.post().tweet.body
      tweet.author_id = auth.user.id
      tweet.is_retweet = false
      await tweet.save()
      return response.send("success")
    } catch (e) {
      return response.status(422).send({
        errors: {
          body: [
            {
              error: e,
            }
          ]
        }
      })
    }
  }
  async retweet({ auth, request, response }){
    
  }
  async edit({ auth, request, response }){
    
  }
  async delete({ auth, request, response }){
    
  }
}

module.exports = TweetController
