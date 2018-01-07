import CommonActions from 'common/actions'

function createAction(api, actionName, { setToDefaultIfError = true, setLoading = false } = {}) {
  return {
    reset: () => ({
      type: `RESET_${actionName}`
    }),
    fetch: function(...params) {
      return dispatch => {
        if (setLoading) dispatch(CommonActions.isLoading(true))
        dispatch({ type: `FETCH_START_${actionName}` })
        return api(...params).then(
          result => {
            if (setLoading) dispatch(CommonActions.isLoading(false))
            dispatch({
              type: `FETCH_SUCCESS_${actionName}`,
              payload: result
            })
            return result
          },
          err => {
            if (setLoading) dispatch(CommonActions.isLoading(false))
            dispatch({
              type: `FETCH_ERROR_${actionName}`,
              error: true,
              payload: err,
              setToDefaultIfError
            })
            return Promise.reject(err)
          }
        )
      }
    }
  }
}

export default createAction
