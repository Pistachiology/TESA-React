const selectors = {
  isLoading: state => state.getIn(['common', 'isLoading']),
  notifyMessage: state => state.getIn(['common', 'notifyMessage'])
}

export default selectors
