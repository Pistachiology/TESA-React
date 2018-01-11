import { Container } from 'semantic-ui-react'
import DataTable from 'modules/tesa/components/DataTable/notification'
import React from 'react'
import TesaActions from 'modules/tesa/actions'
import TesaSelectors from 'modules/tesa/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLayout from 'layout'

class NotificationPage extends React.Component {
  componentWillMount() {
    this.props.getNotification()
  }
  render() {
    const { notification } = this.props

    return (
      <Container>
        <DataTable data={notification} filterable />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  notification: TesaSelectors.notification(state)
})

const mapDispatchToProps = dispatch => ({
  getNotification: () => dispatch(TesaActions.getNotification())
})

export default compose(withLayout('Notification'), connect(mapStateToProps, mapDispatchToProps))(NotificationPage)
