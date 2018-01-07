import { colors, fontSizes, mediaPaddingSizes } from 'common/mixins'

import CommonSelectors from 'common/selectors'
import React from 'react'
import { connect } from 'react-redux'
import hideable from 'common/enchancers/hideable'
import styled from 'styled-components'

const StyledPopupMessage = styled(PopupMessage)`
  ${mediaPaddingSizes.medium};
  position: fixed;
  z-index: 1000;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.85);
  left: 0;
  text-align: center;
  color: black;
  border: 3px solid ${colors.mainBlue};
  width: 40%;
  max-width: 300px;
  box-shadow: 2px 2px 20px ${colors.mainBlue};
  border-left-width: 15px;
  border-top-right-radius: 15px;
`
const HeaderMsgSection = styled.div`
  width: 100%;
  float: left;
  margin-bottom: 10px;
  ${fontSizes.large4};
`
const ContentMsgSection = styled.div`
  width: 100%;
  float: left;
  ${fontSizes.large1};
`
function PopupMessage({ className, messageInfo }) {
  return (
    <div className={className}>
      <HeaderMsgSection>
        <h3>{messageInfo.get('header')}</h3>
      </HeaderMsgSection>
      <ContentMsgSection>
        <h4>{messageInfo.get('message')}</h4>
      </ContentMsgSection>
    </div>
  )
}

const HideablePopupMessageTemp = hideable('0s')(StyledPopupMessage)
const HideablePopupMessage = props => <HideablePopupMessageTemp {...props} hide={!props.messageInfo.get('isActive')} />

const mapStateToProps = state => ({
  messageInfo: CommonSelectors.notifyMessage(state)
})

export default connect(mapStateToProps)(HideablePopupMessage)
