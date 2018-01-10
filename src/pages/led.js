import Api from 'common/lib/api'
import { Container } from 'semantic-ui-react'
import DataTable from 'modules/tesa/components/DataTable'
import Immutable from 'immutable'
import React from 'react'
import { compose } from 'redux'
import withLayout from 'layout'

class LedPage extends React.Component {
  state = {
    leds: Immutable.List()
  }
  async componentWillMount() {
    const rawLeds = await Api.getLeds()
    const leds = rawLeds.get('data') || Immutable.List()
    this.setState({ leds })
  }
  render() {
    const { leds } = this.state

    return (
      <Container>
        <DataTable
          title="LED"
          data={leds.toJS()}
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

export default compose(withLayout('Pressure'))(LedPage)
