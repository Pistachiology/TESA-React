import Api from 'common/lib/api'
import { Container } from 'semantic-ui-react'
import Immutable from 'immutable'
import PressureDataTable from 'modules/tesa/components/DataTable/pressure'
import React from 'react'
import { compose } from 'redux'
import withLayout from 'layout'

class PressurePage extends React.Component {
  state = {
    pressure: Immutable.List()
  }
  async componentWillMount() {
    const rawPressure = await Api.getPressure()
    const pressure = rawPressure.get('data') || Immutable.List()
    this.setState({ pressure })
  }
  render() {
    const { pressure } = this.state

    return (
      <Container>
        <PressureDataTable data={pressure} />
      </Container>
    )
  }
}

export default compose(withLayout('Pressure'))(PressurePage)
