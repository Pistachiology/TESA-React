import { combineReducers } from 'redux-immutable'
import constants from './constants'
import createApiReducer from 'common/lib/api/createReducer'

const reducers = combineReducers({
  temperature: createApiReducer(constants.TEMPERATURE),
  pressure: createApiReducer(constants.PRESSURE),
  magnetometer: createApiReducer(constants.MAGNETOMETER),
  humidity: createApiReducer(constants.HUMIDITY),
  gyroscope: createApiReducer(constants.GYROSCOPE),
  accelerometer: createApiReducer(constants.ACCELEROMETER),
  digitalInput: createApiReducer(constants.DIGITAL_INPUT)
})

export default reducers
