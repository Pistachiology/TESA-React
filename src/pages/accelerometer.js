import AccelerometerDataTable from 'modules/tesa/components/DataTable/accelerometer'
import Api from 'common/lib/api'
import { Container } from 'semantic-ui-react'
import Immutable from 'immutable'
import React from 'react'
import { compose } from 'redux'
import withLayout from 'layout'

class AccelerometerPage extends React.Component {
  state = {
    accelerometer: Immutable.List()
  }
  async componentWillMount() {
    const rawAccelerometer = await Api.getAccelerometer()
    const accelerometer = rawAccelerometer.get('data') || Immutable.List()
    this.setState({ accelerometer })
  }
  render() {
    const { accelerometer } = this.state

    return (
      <Container>
        <AccelerometerDataTable data={accelerometer} />
      </Container>
    )
  }
}

export default compose(withLayout('Accelerometer'))(AccelerometerPage)
