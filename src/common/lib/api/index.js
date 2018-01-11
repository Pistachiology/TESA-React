import api from './manager'

export default {
  getTemperature() {
    return api.get('/temperature')
  },

  getHumidity() {
    return api.get('/humidity')
  },

  getPressure() {
    return api.get('/pressure')
  },

  getMagnetometer() {
    return api.get('/magnetometer')
  },

  getLeds() {
    return api.get('/led')
  },

  getGyroscope() {
    return api.get('/gyroscope')
  },

  getAccelerometer() {
    return api.get('/accelerometer')
  },

  getDigitalInput(digitalNumber) {
    return api.get(`/din${digitalNumber}`)
  },

  getNotification() {
    return api.get(`/alert`)
  },

  getLatestTemperature(N = 20) {
    return api.get(`/temperature/latest/${N}`)
  },

  getLatestHumidity(N = 20) {
    return api.get(`/humidity/latest/${N}`)
  },

  getLatestPressure(N = 20) {
    return api.get(`/pressure/latest/${N}`)
  },

  getLatestMagnetometer(N = 20) {
    return api.get(`/magnetometer/latest/${N}`)
  },

  getLatestLeds(N = 20) {
    return api.get(`/led/latest/${N}`)
  },

  getLatestGyroscope(N = 20) {
    return api.get(`/gyroscope/latest/${N}`)
  },

  getLatestAccelerometer(N = 20) {
    return api.get(`/accelerometer/latest/${N}`)
  },

  getLatestDigitalInput(digitalNumber, N = 20) {
    return api.get(`/din${digitalNumber}/latest/${N}`)
  },

  getLatestNotification(N = 20) {
    return api.get(`/alert/${N}`)
  },

  testApi() {
    return api.get('/animals/test')
  },

  testPost() {
    return api.post('/animals/testPost', {
      testData: 'testData'
    })
  }
}
