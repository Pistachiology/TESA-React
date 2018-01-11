import AccelerometerDataTable from 'modules/tesa/components/DataTable/accelerometer'
import { Container } from 'semantic-ui-react'
import React from 'react'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLayout from 'layout'

class AccelerometerPage extends React.Component {
  componentWillMount() {
    this.props.getAccelerometer()
  }
  render() {
    const { accelerometer } = this.props

    return (
      <Container>
        <AccelerometerDataTable data={accelerometer} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  accelerometer: TesaSelectors.accelerometer(state)
})

const mapDispatchToProps = dispatch => ({
  getAccelerometer: () => dispatch(TesaActions.getAccelerometer())
})

export default compose(withLayout('Accelerometer'), connect(mapStateToProps, mapDispatchToProps))(AccelerometerPage)
