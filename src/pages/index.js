import { Container, Header, Icon, Input } from 'semantic-ui-react'

import AccelerometerDataTable from 'modules/tesa/components/DataTable/accelerometer'
import Datetime from 'react-datetime'
import DigitalInputDataTable from 'modules/tesa/components/DataTable/digitalInput'
import GyroscopeDataTable from 'modules/tesa/components/DataTable/gyroscope'
import HumidityDataTable from 'modules/tesa/components/DataTable/humidity'
import MagnetometerDataTable from 'modules/tesa/components/DataTable/magnetometer'
import PressureDataTable from 'modules/tesa/components/DataTable/pressure'
import React from 'react'
import TemperatureDataTable from 'modules/tesa/components/DataTable/temperature'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import withLayout from 'layout'

class IndexPage extends React.Component {
  state = {
    startDate: moment().subtract(30, 'minutes'),
    endDate: moment()
  }

  componentWillMount() {
    this.props.getAccelerometer()
    this.props.getPressure()
    this.props.getGyroscope()
    this.props.getHumidity()
    this.props.getMagnetometer()
    this.props.getTemperature()
    this.props.getDigitalInput()
  }

  handleDateChange = (time, attr) => {
    if (typeof time == 'string') {
      return
    }
    this.setState({ [attr]: time })
  }

  renderInput = props => {
    return (
      <Input icon placeholder={props.placeholder}>
        <input {...props} />
        <Icon name="calendar" />
      </Input>
    )
  }

  render() {
    const { pressure, accelerometer, gyroscope, humidity, magnetometer, temperature, digitalInput } = this.props
    return (
      <Container>
        <Header size="huge"> Recently Data </Header>
        <Datetime
          timeFormat="HH:mm"
          dateFormat={false}
          onChange={moment => this.handleDateChange(moment, 'startDate')}
          value={this.state.startDate}
          renderInput={this.renderInput}
          placeholder={'Select Date'}
          inputProps={{
            id: 'startDate',
            name: 'startDate',
            text: 'Start Date',
            required: true
          }}
        />
        <AccelerometerDataTable data={accelerometer} />
        <TemperatureDataTable data={temperature} />
        <DigitalInputDataTable data={digitalInput} />
        <PressureDataTable data={pressure} />
        <GyroscopeDataTable data={gyroscope} />
        <HumidityDataTable data={humidity} />
        <MagnetometerDataTable data={magnetometer} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  accelerometer: TesaSelectors.accelerometer(state),
  pressure: TesaSelectors.pressure(state),
  gyroscope: TesaSelectors.gyroscope(state),
  humidity: TesaSelectors.humidity(state),
  magnetometer: TesaSelectors.magnetometer(state),
  temperature: TesaSelectors.temperature(state),
  digitalInput: TesaSelectors.digitalInput(state)
})

const mapDispatchToProps = dispatch => ({
  getAccelerometer: () => dispatch(TesaActions.getAccelerometer()),
  getPressure: () => dispatch(TesaActions.getPressure()),
  getGyroscope: () => dispatch(TesaActions.getGyroscope()),
  getHumidity: () => dispatch(TesaActions.getHumidity()),
  getMagnetometer: () => dispatch(TesaActions.getMagnetometer()),
  getTemperature: () => dispatch(TesaActions.getTemperature()),
  getDigitalInput: () => dispatch(TesaActions.getDigitalInput(1))
})

export default compose(withLayout('Index'), connect(mapStateToProps, mapDispatchToProps))(IndexPage)

/* Example Usage

  async componentWillMount() {
    const data = await Api.testApi()
    const data2 = await Api.testPost()
    console.log(data2) // eslint-disable-line
    this.setState({ data })
  }

  render() {
    const test = this.state.data
    if (!test) return null
    return <div>Hello World {test.get('test')} </div>
  }
 */
