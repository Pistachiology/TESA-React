import Api from 'common/lib/api'
import constants from './constants'
import createApiAction from 'common/lib/api/createAction'

const temperatureApiAction = createApiAction(constants.TEMPERATURE)
const pressureApiAction = createApiAction(constants.PRESSURE)
const magnetometerApiAction = createApiAction(constants.MAGNETOMETER)
const humidityApiAction = createApiAction(constants.HUMIDITY)
const gyroscopeApiAction = createApiAction(constants.GYROSCOPE)
const accelerometerApiAction = createApiAction(constants.ACCELEROMETER)
const digitalInputApiAction = createApiAction(constants.DIGITAL_INPUT)
const notificationInputApiAction = createApiAction(constants.NOTIFICATION)

const actions = {
  getTemperature: () => temperatureApiAction.fetch(Api.getTemperature),
  getPressure: () => pressureApiAction.fetch(Api.getPressure),
  getMagnetometer: () => magnetometerApiAction.fetch(Api.getMagnetometer),
  getHumidity: () => humidityApiAction.fetch(Api.getHumidity),
  getGyroscope: () => gyroscopeApiAction.fetch(Api.getGyroscope),
  getAccelerometer: () => accelerometerApiAction.fetch(Api.getAccelerometer),
  getDigitalInput: i => digitalInputApiAction.fetch(Api.getDigitalInput, i),
  getNotification: () => notificationInputApiAction.fetch(Api.getNotification),
  getLatestTemperature: () => temperatureApiAction.fetch(Api.getLatestTemperature),
  getLatestPressure: () => pressureApiAction.fetch(Api.getLatestPressure),
  getLatestMagnetometer: () => magnetometerApiAction.fetch(Api.getLatestMagnetometer),
  getLatestHumidity: () => humidityApiAction.fetch(Api.getLatestHumidity),
  getLatestGyroscope: () => gyroscopeApiAction.fetch(Api.getLatestGyroscope),
  getLatestAccelerometer: () => accelerometerApiAction.fetch(Api.getLatestAccelerometer),
  getLatestDigitalInput: i => digitalInputApiAction.fetch(Api.getLatestDigitalInput, i),
  getLatestNotification: () => notificationInputApiAction.fetch(Api.getLatestNotification)
}

export default actions
