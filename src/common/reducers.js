import { handleAction, handleActions } from 'redux-actions'

import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import constants from './constants'

const reducers = combineReducers({
  isLoading: handleAction(
    constants.LOADING,
    (state, action) => {
      if (action.payload == true) {
        return state + 1
      }
      return state - 1
    },
    0
  ),
  notifyMessage: handleActions(
    {
      [`SHOW_${constants.NOTIFY_MESSAGE}`]: (state, action) => {
        const { message, header } = action
        if (state.get('isActive')) return state
        return Immutable.fromJS({ isActive: true, message, header })
      },
      [`HIDE_${constants.NOTIFY_MESSAGE}`]: state => {
        return state.set('isActive', false)
      }
    },
    Immutable.fromJS({ isActive: false, message: '', header: '' })
  )
})

export default reducers
