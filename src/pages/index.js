import { Container, Header } from 'semantic-ui-react'

import AccelerometerDataTable from 'modules/tesa/components/DataTable/accelerometer'
import DigitalInputDataTable from 'modules/tesa/components/DataTable/digitalInput'
import GyroscopeDataTable from 'modules/tesa/components/DataTable/gyroscope'
import HumidityDataTable from 'modules/tesa/components/DataTable/humidity'
import MagnetometerDataTable from 'modules/tesa/components/DataTable/magnetometer'
import NotificationDataTable from 'modules/tesa/components/DataTable/notification'
import PressureDataTable from 'modules/tesa/components/DataTable/pressure'
import React from 'react'
import TemperatureDataTable from 'modules/tesa/components/DataTable/temperature'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLayout from 'layout'

class IndexPage extends React.Component {
  componentWillMount() {
    this.props.getAccelerometer()
    this.props.getPressure()
    this.props.getGyroscope()
    this.props.getHumidity()
    this.props.getMagnetometer()
    this.props.getTemperature()
    this.props.getDigitalInput()
    this.props.getNotification()
  }

  render() {
    const { pressure, accelerometer, gyroscope, humidity, notification, magnetometer, temperature, digitalInput } = this.props
    console.log(notification) //eslint-disable-line
    return (
      <Container>
        <Header size="huge"> Recently Data </Header>
        <NotificationDataTable data={notification} showGraph />
        <AccelerometerDataTable data={accelerometer} showGraph />
        <TemperatureDataTable data={temperature} showGraph />
        <DigitalInputDataTable data={digitalInput} showGraph />
        <PressureDataTable data={pressure} showGraph />
        <GyroscopeDataTable data={gyroscope} showGraph />
        <HumidityDataTable data={humidity} showGraph />
        <MagnetometerDataTable data={magnetometer} showGraph />
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
  digitalInput: TesaSelectors.digitalInput(state),
  notification: TesaSelectors.notification(state)
})

const mapDispatchToProps = dispatch => ({
  getAccelerometer: () => dispatch(TesaActions.getLatestAccelerometer()),
  getPressure: () => dispatch(TesaActions.getLatestPressure()),
  getGyroscope: () => dispatch(TesaActions.getLatestGyroscope()),
  getHumidity: () => dispatch(TesaActions.getLatestHumidity()),
  getMagnetometer: () => dispatch(TesaActions.getLatestMagnetometer()),
  getTemperature: () => dispatch(TesaActions.getLatestTemperature()),
  getDigitalInput: () => dispatch(TesaActions.getLatestDigitalInput(1)),
  getNotification: () => dispatch(TesaActions.getLatestNotification())
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
