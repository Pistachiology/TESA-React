import { Container } from 'semantic-ui-react'
import MagnetometerDataTable from 'modules/tesa/components/DataTable/magnetometer'
import React from 'react'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLayout from 'layout'

class MagnetometerPage extends React.Component {
  componentWillMount() {
    this.props.getMagnetometer()
  }
  render() {
    const { magnetometer } = this.props

    return (
      <Container>
        <MagnetometerDataTable data={magnetometer} filterable />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  magnetometer: TesaSelectors.pressure(state)
})

const mapDispatchToProps = dispatch => ({
  getMagnetometer: () => dispatch(TesaActions.getPressure())
})

export default compose(withLayout('Magnetometer'), connect(mapStateToProps, mapDispatchToProps))(MagnetometerPage)
