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

  testApi() {
    return api.get('/animals/test')
  },

  testPost() {
    return api.post('/animals/testPost', {
      testData: 'testData'
    })
  }
}
