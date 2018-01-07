import api from './manager'

const Api = {
  login(email, password) {
    return api.post('auth/login', {
      email,
      password
    })
  },

  logout() {
    return api.post('auth/logout')
  },

  register(name, email, password, password_confirmation, captcha) {
    return api.post('auth/register', {
      name,
      email,
      password,
      password_confirmation,
      'g-recaptcha-response': captcha
    })
  },

  forgotPassword(email) {
    return api.post('auth/password/email', { email })
  },

  resetPassword(email, token, password, passwordConfirmation) {
    return api.post('auth/password/reset', {
      email,
      token,
      password,
      passwordConfirmation
    })
  },

  getUserInfo() {
    return api.get('users/me')
  },

  updatePassword(password, newPassword, newPasswordConfirmation) {
    return api.put('users/me', {
      password,
      newPassword,
      newPasswordConfirmation
    })
  },

  getMockup() {
    return api.get('users/mock')
  },

  getIcos() {
    return api.get('icos/')
  },

  getIco(id) {
    return api.get(`icos/${id}`)
  },

  getPressMentions() {
    return api.get('press-mentions')
  },

  getUserIcos() {
    return api.get('users/me/icos')
  },

  getUserIco(id) {
    return api.get(`users/me/icos/${id}`)
  },

  getIcoInvoice(id) {
    return api.get(`icos/${id}/invoice`, id)
  },

  addUserIco(data) {
    return api.postWithFiles(`users/me/icos`, data)
  },

  getIcoProps() {
    return api.get('icos/props')
  },

  putIcoLinks(id, links) {
    return api.put(`icos/${id}/links`, links)
  },

  updateIcoMembers(id, data) {
    return api.putWithFiles(`icos/${id}/members`, data)
  },

  addIcoMembers(id, data) {
    return api.postWithFiles(`icos/${id}/members`, data)
  },

  updateIcoDistributions(id, data) {
    return api.putWithFiles(`icos/${id}/distributions`, data)
  },

  addIcoDistributions(id, data) {
    return api.postWithFiles(`icos/${id}/distributions`, data)
  },

  updateIco(id, data) {
    return api.putWithFiles(`icos/${id}`, data)
  },

  // TODO: Test Api need to delete when finished
  uploadImageTest(text, image) {
    return api.postWithFilesLegacy('test/images/upload', {
      someText: text,
      image
    })
  },

  testFileRequest(data) {
    return api.putWithFiles('test/req', data)
  }
}

export default Api
