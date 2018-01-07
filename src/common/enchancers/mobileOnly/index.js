import React from 'react'
import { screen } from 'common/mixins'
import styled from 'styled-components'

function mobileOnly(Component) {
  const MO = props => <Component {...props} />
  return styled(MO)`
    @media (min-width: ${screen.xs + 1}px) {
      display: none;
    }
  `
}

export default mobileOnly
