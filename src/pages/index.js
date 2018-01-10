import AccelerometerDataTable from 'modules/tesa/components/DataTable/accelerometer'
import Api from 'common/lib/api'
import { Container } from 'semantic-ui-react'
import GyroscopeDataTable from 'modules/tesa/components/DataTable/gyroscope'
import HumidityDataTable from 'modules/tesa/components/DataTable/humidity'
import Immutable from 'immutable'
import MagnetometerDataTable from 'modules/tesa/components/DataTable/magnetometer'
import PressureDataTable from 'modules/tesa/components/DataTable/pressure'
import React from 'react'
import TemperatureDataTable from 'modules/tesa/components/DataTable/temperature'
import { compose } from 'redux'
import withLayout from 'layout'

function filterLastNMinutes(data, minutes = 50) {
  return data.filter(d => {
    let currentDate = new Date()
    let dataDate = new Date(d.get('date'))
    currentDate.setMinutes(currentDate.getMinutes() - minutes)
    return dataDate.getTime() >= currentDate.getTime()
  })
}

class IndexPage extends React.Component {
  state = {
    magnetometer: Immutable.List(),
    humidity: Immutable.List(),
    gyroscope: Immutable.List(),
    accelerometer: Immutable.List(),
    pressure: Immutable.List(),
    temperature: Immutable.List()
  }

  async componentWillMount() {
    const rawAccelerometer = await Api.getAccelerometer()
    const accelerometer = filterLastNMinutes(rawAccelerometer.get('data') || Immutable.List())

    const rawGyroscope = await Api.getGyroscope()
    const gyroscope = filterLastNMinutes(rawGyroscope.get('data') || Immutable.List())
    const rawHumidity = await Api.getHumidity()
    const humidity = filterLastNMinutes(rawHumidity.get('data') || Immutable.List())

    const rawMagnetometer = await Api.getGyroscope()
    const magnetometer = filterLastNMinutes(rawMagnetometer.get('data') || Immutable.List())

    const rawPressure = await Api.getPressure()
    const pressure = filterLastNMinutes(rawPressure.get('data') || Immutable.List())

    const rawTemperature = await Api.getTemperature()
    const temperature = filterLastNMinutes(rawTemperature.get('data') || Immutable.List())
    this.setState({
      accelerometer,
      gyroscope,
      humidity,
      pressure,
      magnetometer,
      temperature
    })
  }
  render() {
    const { pressure, accelerometer, gyroscope, humidity, magnetometer, temperature } = this.state
    return (
      <Container>
        <PressureDataTable data={pressure} />
        <AccelerometerDataTable data={accelerometer} />
        <GyroscopeDataTable data={gyroscope} />
        <HumidityDataTable data={humidity} />
        <MagnetometerDataTable data={magnetometer} />
        <TemperatureDataTable data={temperature} />
      </Container>
    )
  }
}

export default compose(withLayout('Index'))(IndexPage)

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
