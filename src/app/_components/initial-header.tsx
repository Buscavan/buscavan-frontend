'use client'

import {
  Header,
  HeaderContent,
  HeaderContentLogo,
} from '@/components/application/header'
import { Logo } from '@/components/application/logo'

export function InitialHeader() {
  return (
    <Header>
      <HeaderContent>
        <HeaderContentLogo>
          <Logo path="/" />
        </HeaderContentLogo>
      </HeaderContent>
    </Header>
  )
}
