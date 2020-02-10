'use strict'

const moment = require('moment')
const passwordGrant = async (auth, email, password) => {
  const token = await auth.withRefreshToken().attempt(email, password)
  const claim = JSON.parse(
    Buffer.from(token.token.split('.')[1], 'base64').toString()
  )

  return {
    access_token: token.token,
    token_type: token.type,
    expires_in: claim.exp - moment().unix(),
    refresh_token: token.refreshToken,
    created_at: moment.now()
  }
}

const refreshTokenGrant = async (auth, refresh_token) => {
  const token = await auth
    .newRefreshToken()
    .generateForRefreshToken(refresh_token)
  const claim = JSON.parse(
    Buffer.from(token.token.split('.')[1], 'base64').toString()
  )

  return {
    access_token: token.token,
    token_type: token.type,
    expires_in: claim.exp - moment().unix(),
    refresh_token: token.refreshToken,
    scope: 'public'
  }
}

class TokenController {
  async login({ auth, request, response }){
    try {
      const { grant_type, email, password, refresh_token } = request.post()

      switch (grant_type) {
        case 'password':
          response.send(await passwordGrant(auth, email, password))
          break
        case 'refresh_token':
          response.send(await refreshTokenGrant(auth, refresh_token))
          break
        default:
          throw new Error('not define grant_type')
      }

    } catch (e) {
      return response.status(401).json({
        "errors": {
          "token": [
            {
              "error": "invalid_grant"
            }
          ]
        }
      })
    }
  }
  async logout({ auth, request, response }){
    const apiToken = auth.getAuthHeader()
    try {
      await auth
        .authenticator('api')
        .revokeTokens([apiToken])
      return response.send('logout success')
    } catch (e) {
      return response.send(e)
    }
  }
}

module.exports = TokenController
