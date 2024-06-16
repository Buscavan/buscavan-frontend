'use client'

import { Dropdown } from './dropdown'
import { SideDrawer } from '../_components/side-drawer'
import {
  Header,
  HeaderContent,
  HeaderContentActions,
  HeaderContentLogo,
} from '@/components/application/header'
import { Logo } from '@/components/application/logo'

export function MainHeader() {
  return (
    <Header>
      <HeaderContent>
        <HeaderContentLogo>
          <SideDrawer />

          <Logo path="/search" />
        </HeaderContentLogo>

        <HeaderContentActions>
          <Dropdown />
        </HeaderContentActions>
      </HeaderContent>
    </Header>
  )
}
