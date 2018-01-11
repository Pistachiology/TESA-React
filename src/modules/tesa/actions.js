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

const actions = {
  getTemperature: () => temperatureApiAction.fetch(Api.getTemperature),
  getPressure: () => pressureApiAction.fetch(Api.getPressure),
  getMagnetometer: () => magnetometerApiAction.fetch(Api.getMagnetometer),
  getHumidity: () => humidityApiAction.fetch(Api.getHumidity),
  getGyroscope: () => gyroscopeApiAction.fetch(Api.getGyroscope),
  getAccelerometer: () => accelerometerApiAction.fetch(Api.getAccelerometer),
  getDigitalInput: i => digitalInputApiAction.fetch(Api.getDigitalInput, i)
}

export default actions
