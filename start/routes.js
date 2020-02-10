'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group( () => {
  Route.get('user', 'UserController.getList')
  Route.post('user', 'UserController.create')
  
  // login
  Route.post('oauth/token', 'TokenController.login')
}).prefix('api/v1')

Route.group( () => {
  // logout
  Route.post('oauth/revoke', 'TokenController.logout')

  // tweet
  Route.get('tweets', 'TweetController.list')
  Route.post('tweets', 'TweetController.create')
  Route.post('tweets/:id/retweet', 'TweetController.retweet')
  Route.put('tweets/:id', 'TweetController.edit')
  Route.delete('tweets/:id', 'TweetController.delete')
}).prefix('api/v1').middleware(['auth:jwt'])

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
