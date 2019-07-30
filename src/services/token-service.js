import config from '../config'
const jwtDecode = require('jwt-decode')

const TokenService = {
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
  },
  clearUserId(userid) {
    window.sessionStorage.removeItem('userid', userid)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(email, password) {
    return window.btoa(`${email}:${password}`)
  },
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
  },
  getUserEmail() {
    let token = TokenService.getAuthToken();
    if (!token) {
      return "Guest";
    }
    let decoded = jwtDecode(token);
    return decoded.sub;
  },
  saveUserId(userid) {
    window.sessionStorage.setItem('userid', userid);
  },
  getUserId(userid) {
    return window.sessionStorage.getItem('userid', userid)
  }
};

export default TokenService 