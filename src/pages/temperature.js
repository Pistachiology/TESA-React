import Api from 'common/lib/api'
import { Container } from 'semantic-ui-react'
import DataTable from 'modules/tesa/components/DataTable'
import Immutable from 'immutable'
import React from 'react'
import { compose } from 'redux'
import withLayout from 'layout'

class TemperaturePage extends React.Component {
  state = {
    temperature: Immutable.List()
  }
  async componentWillMount() {
    const rawTemperature = await Api.getTemperature()
    const temperature = rawTemperature.get('data') || Immutable.List()
    this.setState({ temperature })
  }
  render() {
    const { temperature } = this.state

    return (
      <Container>
        <DataTable
          title="Temperature"
          data={temperature.toJS()}
          tableProps={{
            compact: true,
            basic: 'very',
            striped: true,
            size: 'small'
          }}
          header
          rowsPerPage={20}
          columnHeader={['sensID', 'val', 'date']}
        />
      </Container>
    )
  }
}

export default compose(withLayout('Temperature'))(TemperaturePage)
