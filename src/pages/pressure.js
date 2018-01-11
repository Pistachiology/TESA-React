import { Container } from 'semantic-ui-react'
import PressureDataTable from 'modules/tesa/components/DataTable/pressure'
import React from 'react'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLayout from 'layout'

class PressurePage extends React.Component {
  componentWillMount() {
    this.props.getPressure()
  }
  render() {
    const { pressure } = this.props

    return (
      <Container>
        <PressureDataTable data={pressure} filterable />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  pressure: TesaSelectors.pressure(state)
})

const mapDispatchToProps = dispatch => ({
  getPressure: () => dispatch(TesaActions.getPressure())
})

export default compose(withLayout('Pressure'), connect(mapStateToProps, mapDispatchToProps))(PressurePage)
