import { Container } from 'semantic-ui-react'
import DataTable from 'modules/tesa/components/DataTable/temperature'
import React from 'react'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLayout from 'layout'

class TemperaturePage extends React.Component {
  componentWillMount() {
    this.props.getTemperature()
  }
  render() {
    const { temperature } = this.props

    return (
      <Container>
        <DataTable data={temperature} filterable />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  temperature: TesaSelectors.temperature(state)
})

const mapDispatchToProps = dispatch => ({
  getTemperature: () => dispatch(TesaActions.getTemperature())
})

export default compose(withLayout('Temperature'), connect(mapStateToProps, mapDispatchToProps))(TemperaturePage)
