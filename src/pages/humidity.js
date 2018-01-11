import { Container } from 'semantic-ui-react'
import HumidityDataTable from 'modules/tesa/components/DataTable/humidity'
import React from 'react'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLayout from 'layout'
class HumidityPage extends React.Component {
  componentWillMount() {
    this.props.getHumidity()
  }
  render() {
    const { humidity } = this.props

    return (
      <Container>
        <HumidityDataTable data={humidity} filterable />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  humidity: TesaSelectors.humidity(state)
})

const mapDispatchToProps = dispatch => ({
  getHumidity: () => dispatch(TesaActions.getHumidity())
})

export default compose(withLayout('Humidity'), connect(mapStateToProps, mapDispatchToProps))(HumidityPage)
