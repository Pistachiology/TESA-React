import { Icon, Menu } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import React from 'react'
import cn from 'classnames'
import { media } from 'common/mixins'
import styled from 'styled-components'

const SidebarMenu = styled(Menu)`
  display: block;
  float: left;
  z-index: 50 !important;
  min-height: 100vh !important;
  margin-bottom: 0 !important;
  transition: width ease-in 0.2s;
  overflow: hidden;
  padding-top: 40px;

  ${media.xs`
		width: 100% !important;
	`};

  &.inactive {
    width: 0 !important;
  }
`

const Sidebar = ({ className, isActive }) => (
  <SidebarMenu size="small" className={cn(className, !isActive && 'inactive')} vertical inverted>
    <Link to="/">
      <Menu.Item name="dashboard">
        <Icon name="dashboard" />
        Dashboard
      </Menu.Item>
    </Link>
  </SidebarMenu>
)

export default Sidebar
