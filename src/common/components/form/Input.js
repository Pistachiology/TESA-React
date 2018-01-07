import styled from 'styled-components'

const Input = styled.input`
	${props =>
		props.invalid &&
		`
			border-color: red;
		`};
`

export default Input
