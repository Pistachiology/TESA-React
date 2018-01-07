import React from 'react'
import cn from 'classnames'
import styled from 'styled-components'

function Hideable(time = '0.5s') {
  return Component => {
    const TransitionComponent = ({ className, hide, ...props }) => <Component className={cn(className, hide && 'hide__')} {...props} />
    // overwrite semantic transition
    return styled(TransitionComponent)`
      transition: visibility ${time} linear, opacity ${time} linear !important;
      visibility: visible;
      opacity: 1;
      &.hide__ {
        visibility: hidden;
        opacity: 0;
        display: none !important;
      }
    `
  }
}

export default Hideable
