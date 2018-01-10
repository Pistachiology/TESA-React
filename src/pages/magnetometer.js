import Api from 'common/lib/api'
import { Container } from 'semantic-ui-react'
import Immutable from 'immutable'
import MagnetometerDataTable from 'modules/tesa/components/DataTable/magnetometer'
import React from 'react'
import { compose } from 'redux'
import withLayout from 'layout'

class MagnetometerPage extends React.Component {
  state = {
    magnetometer: Immutable.List()
  }
  async componentWillMount() {
    const rawMagnetometer = await Api.getGyroscope()
    const magnetometer = rawMagnetometer.get('data') || Immutable.List()
    this.setState({ magnetometer })
  }
  render() {
    const { magnetometer } = this.state

    return (
      <Container>
        <MagnetometerDataTable
          title="Magnetometer"
          data={magnetometer.toJS()}
          tableProps={{
            compact: true,
            basic: 'very',
            striped: true,
            size: 'small'
          }}
          header
          rowsPerPage={20}
          columnHeader={['sensID', 'val_x', 'val_y', 'val_z', 'date']}
        />
      </Container>
    )
  }
}

export default compose(withLayout('Magnetometer'))(MagnetometerPage)
