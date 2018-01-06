import React from 'react'
import { compose } from 'redux'
import withLayout from 'layout'

class IndexPage extends React.Component {
  render() {
    return <div>Hello World</div>
  }
}

export default compose(withLayout('Index'))(IndexPage)
