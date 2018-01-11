import Immutable from 'immutable'

const selectors = {
  temperature: state => state.getIn(['tesa', 'temperature', 'data']) || Immutable.List(),
  pressure: state => state.getIn(['tesa', 'pressure', 'data']) || Immutable.List(),
  magnetometer: state => state.getIn(['tesa', 'magnetometer', 'data']) || Immutable.List(),
  humidity: state => state.getIn(['tesa', 'humidity', 'data']) || Immutable.List(),
  gyroscope: state => state.getIn(['tesa', 'gyroscope', 'data']) || Immutable.List(),
  accelerometer: state => state.getIn(['tesa', 'accelerometer', 'data']) || Immutable.List(),
  digitalInput: state => state.getIn(['tesa', 'digitalInput', 'data']) || Immutable.List()
}

export default selectors
