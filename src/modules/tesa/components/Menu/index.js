import { Icon, Menu, Container as SemanticContainer } from 'semantic-ui-react'

import React from 'react'
import { connect } from 'react-redux'
import mobileOnly from 'common/enchancers/mobileOnly'

const MobileMenuItem = mobileOnly(Menu.Item)

const Header = ({ onToggle }) => (
  <Menu fixed="top" size="small" inverted>
    <SemanticContainer>
      <Menu.Item as="a" active>
        <Icon name="bitcoin" />
      </Menu.Item>
      <Menu.Menu position="right">
        {/* <Dropdown item text={user && user.get('name')}>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/">
                <div> Home </div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>Logout </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        <MobileMenuItem>
          <Icon name="sidebar" onClick={onToggle} />
        </MobileMenuItem>
      </Menu.Menu>
    </SemanticContainer>
  </Menu>
)

const mapDispatchToProps = () => ({})

export default connect(null, mapDispatchToProps)(Header)
