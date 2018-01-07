import { media, screen } from 'common/mixins'

import CommonSelectors from 'common/selectors'
import LoadingOverlay from 'common/components/Loader/semantic'
import Menu from 'modules/tesa/components/Menu'
import React from 'react'
import Sidebar from 'modules/tesa/components/Sidebar'
import { connect } from 'react-redux'
import hideable from 'common/enchancers/hideable'
import styled from 'styled-components'

const PageContainer = styled.div`
  display: block;
  float: left;
  width: 100%;
  padding-top: 40px; // magic number
  flex: 1 1 0;
  ${media.xs`
		overflow: hidden;
	`};
`

const Container = styled.div`
  display: flex;
  float: left;
  width: 100%;
`
const HideableLoadingOverlay = hideable()(LoadingOverlay)

const EnchancedLayout = title => Component => {
  class Layout extends React.PureComponent {
    state = {
      isActive: true
    }

    static getInitialProps(ctx) {
      if (Component.getInitialProps) return Component.getInitialProps(ctx)
    }

    get isMobile() {
      if (typeof window === 'undefined') {
        return false
      }
      const rootHtml = document.getElementsByTagName('html')[0]
      if (rootHtml && rootHtml.offsetWidth <= screen.xs) {
        return true
      }
      return false
    }

    componentDidMount() {
      if (this.isMobile) {
        this.setState({ isActive: !this.state.isActive })
      }
    }

    render() {
      const { loading } = this.props
      return (
        <div>
          {title}
          <HideableLoadingOverlay hide={!loading} />
          <Menu user={this.props.user} onToggle={() => this.setState({ isActive: !this.state.isActive })} isMobile={this.isMobile} />
          <Container>
            <Sidebar isActive={this.state.isActive} />
            <PageContainer>
              <Component {...this.props} />
            </PageContainer>
          </Container>
        </div>
      )
    }
  }

  const mapStateToProps = state => ({
    loading: CommonSelectors.isLoading(state)
  })

  const mapDispatchToProps = () => ({})

  const LayoutWithRedux = connect(mapStateToProps, mapDispatchToProps)(Layout)
  return LayoutWithRedux
}

export default EnchancedLayout
