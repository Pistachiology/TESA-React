import { fontSizes, media } from 'common/mixins'

import CommonActions from 'common/actions'
import CommonSelectors from 'common/selectors'
import LoadingOverlay from 'common/components/Loader/semantic'
import React from 'react'
import { connect } from 'react-redux'
import hideable from 'common/enchancers/hideable'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  float: left;
  width: 100%;
  & p,
  & div {
    line-height: 1.5;
    font-size: ${fontSizes.normal};
    ${media.md`
			font-size: ${fontSizes.normal};
		`};
  }
`

const HideableLoadingOverlay = hideable()(LoadingOverlay)

const EnchancedLayout = title => Component => {
  class Layout extends React.PureComponent {
    static getInitialProps(ctx) {
      ctx.store.dispatch(CommonActions.setUrl(ctx.pathname))
      if (Component.getInitialProps) return Component.getInitialProps(ctx)
    }
    render() {
      return (
        <Container>
          {title}
          <Component {...this.props} />
          <HideableLoadingOverlay hide={!this.props.isLoading} />
        </Container>
      )
    }
  }
  const mapStateToProps = state => ({
    isLoading: CommonSelectors.isLoading(state)
  })
  return connect(mapStateToProps)(Layout)
}

export default EnchancedLayout
