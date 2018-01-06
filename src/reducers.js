import { combineReducers } from 'redux-immutable'
import commonReducers from 'common/reducers'

export default combineReducers({
  common: commonReducers
})
