import Api from 'common/lib/api'
import { Container } from 'semantic-ui-react'
import DataTable from 'modules/tesa/components/DataTable'
import Immutable from 'immutable'
import React from 'react'
import { compose } from 'redux'
import withLayout from 'layout'

class DigitalInputPage extends React.Component {
  state = {
    din: Immutable.List()
  }
  async componentWillMount() {
    let din = Immutable.List()
    for (let i = 1; i <= 5; i++) {
      const d = await Api.getDigitalInput(i)
      din.push(d.get('data') || Immutable.List())
    }
    this.setState({ din })
  }
  render() {
    const { din } = this.state

    return (
      <Container>
        {din.map((d, i) => (
          <DataTable
            title={`Digital Input ${i}`}
            data={d.toJS()}
            tableProps={{
              compact: true,
              basic: 'very',
              striped: true,
              size: 'small'
            }}
            header
            rowsPerPage={20}
            columnHeader={['sensID', 'val', 'date']}
            key={i}
          />
        ))}
      </Container>
    )
  }
}

export default compose(withLayout('Pressure'))(DigitalInputPage)
