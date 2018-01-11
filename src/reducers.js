import { combineReducers } from 'redux-immutable'
import commonReducers from 'common/reducers'
import { routerReducer } from 'react-router-redux'
import tesaReducers from 'modules/tesa/reducers'

export default combineReducers({
  common: commonReducers,
  tesa: tesaReducers,
  router: routerReducer
})
