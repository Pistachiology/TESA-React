import { Dimmer, Loader } from 'semantic-ui-react'

import React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 8833;
  position: fixed;
`

export default function(props) {
  return (
    <LoadingContainer {...props}>
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    </LoadingContainer>
  )
}
