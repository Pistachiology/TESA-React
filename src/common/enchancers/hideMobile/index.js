import React from 'react'
import { media } from 'common/mixins'
import styled from 'styled-components'

function hideMobile(Component) {
	const HMC = props => <Component {...props} />
	return styled(HMC)`
		${media.xs`
			display: none;
		`};
	`
}

export default hideMobile
