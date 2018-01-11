import { Container } from 'semantic-ui-react'
import DataTable from 'modules/tesa/components/DataTable/digitalInput'
import React from 'react'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLayout from 'layout'

class DigitalInputPage extends React.Component {
  async componentWillMount() {
    this.props.getDigitalInput()
  }
  render() {
    const { digitalInput } = this.props

    return (
      <Container>
        <DataTable data={digitalInput} filterable />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  digitalInput: TesaSelectors.digitalInput(state)
})

const mapDispatchToProps = dispatch => ({
  getDigitalInput: () => dispatch(TesaActions.getDigitalInput(1))
})

export default compose(withLayout('Pressure'), connect(mapStateToProps, mapDispatchToProps))(DigitalInputPage)
