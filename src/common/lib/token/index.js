import api from 'common/lib/api'

/*
 * TokenService is a library only use to manage token in localStorage
 * In case, you want to check that do token still valid or fetch user data
 * you should create stateful hoc/enchancer to keep user state in redux instead.
 */

const tokenName = process.env.tokenName

class TokenService {
  requestToken(email, password) {
    return api.login(email, password).then(
      res => {
        const token = res.getIn(['data', 'token'])
        localStorage.setItem(tokenName, token)
        return res
      },
      res => {
        return Promise.reject(res)
      }
    )
  }

  revokeToken() {
    return api.logout().then(
      () => {
        localStorage.removeItem(tokenName)
        return true
      },
      () => {
        return Promise.reject(false)
      }
    )
  }

  isTokenExists() {
    const token = localStorage.getItem(tokenName)
    return !!token
  }

  tokenDidExpired() {
    localStorage.removeItem(tokenName)
    return true
  }

  getToken() {
    return localStorage.getItem(tokenName)
  }
}

export default new TokenService()
