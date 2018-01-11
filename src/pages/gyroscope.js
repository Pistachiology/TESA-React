import { Container } from 'semantic-ui-react'
import GyroscopeDataTable from 'modules/tesa/components/DataTable/gyroscope'
import React from 'react'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLayout from 'layout'

class GyroscopePage extends React.Component {
  componentWillMount() {
    this.props.getGyroscope()
  }
  render() {
    const { gyroscope } = this.props

    return (
      <Container>
        <GyroscopeDataTable data={gyroscope} filterable />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  gyroscope: TesaSelectors.gyroscope(state)
})

const mapDispatchToProps = dispatch => ({
  getGyroscope: () => dispatch(TesaActions.getGyroscope())
})

export default compose(withLayout('Gyroscope'), connect(mapStateToProps, mapDispatchToProps))(GyroscopePage)
