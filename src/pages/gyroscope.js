import Api from 'common/lib/api'
import { Container } from 'semantic-ui-react'
import GyroscopeDataTable from 'modules/tesa/components/DataTable/gyroscope'
import Immutable from 'immutable'
import React from 'react'
import { compose } from 'redux'
import withLayout from 'layout'

class GyroscopePage extends React.Component {
  state = {
    gyroscope: Immutable.List()
  }
  async componentWillMount() {
    const rawGyroscope = await Api.getGyroscope()
    const gyroscope = rawGyroscope.get('data') || Immutable.List()
    this.setState({ gyroscope })
  }
  render() {
    const { gyroscope } = this.state

    return (
      <Container>
        <GyroscopeDataTable data={gyroscope} />
      </Container>
    )
  }
}

export default compose(withLayout('Gyroscope'))(GyroscopePage)
