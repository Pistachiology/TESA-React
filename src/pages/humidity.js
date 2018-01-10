import Api from 'common/lib/api'
import { Container } from 'semantic-ui-react'
import HumidityDataTable from 'modules/tesa/components/DataTable/humidity'
import Immutable from 'immutable'
import React from 'react'
import { compose } from 'redux'
import withLayout from 'layout'

class HumidityPage extends React.Component {
  state = {
    humidity: Immutable.List()
  }
  async componentWillMount() {
    const rawHumidity = await Api.getHumidity()
    const humidity = rawHumidity.get('data') || Immutable.List()
    this.setState({ humidity })
  }
  render() {
    const { humidity } = this.state

    return (
      <Container>
        <HumidityDataTable data={humidity} />
      </Container>
    )
  }
}

export default compose(withLayout('Humidity'))(HumidityPage)
