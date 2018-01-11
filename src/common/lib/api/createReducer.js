import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const defaultState = Immutable.fromJS({
  isFetching: false,
  data: null,
  message: '',
  success: false,
  code: 0
})

function createReducer(actionName) {
  return handleActions(
    {
      [`FETCH_START_${actionName}`]: state => state.set('isFetching', true),
      [`FETCH_SUCCESS_${actionName}`]: (state, action) => {
        return state.set('isFetching', false).merge(action.payload)
      },
      [`FETCH_ERROR_${actionName}`]: (state, action) => {
        state = state.set('isFetching', false).merge(action.payload)
        return action.setToDefaultIfError ? state.merge(defaultState) : state
      },
      [`REQUEST_START_${actionName}`]: state => state.set('isFetching', true),
      [`REQUEST_SUCCESS_${actionName}`]: state => {
        return state.set('isFetching', false)
      },
      [`REQUEST_ERROR_${actionName}`]: (state, action) => {
        state = state.set('isFetching', false)
        return action.setToDefaultIfError ? state.merge(defaultState) : state
      },
      [`RESET_${actionName}`]: () => defaultState
    },
    defaultState
  )
}

export default createReducer
