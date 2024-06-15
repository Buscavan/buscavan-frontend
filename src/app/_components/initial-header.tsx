'use client'

import {
  Header,
  HeaderContent,
  HeaderContentActions,
  HeaderContentLogo,
} from '@/components/application/header'
import { Logo } from '@/components/application/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function InitialHeader() {
  return (
    <Header>
      <HeaderContent>
        <HeaderContentLogo>
          <Logo path="/" />
        </HeaderContentLogo>

        <HeaderContentActions>
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Faça login</Link>
          </Button>

          <Button asChild>
            <Link href="/auth/register">Cadastre-se já</Link>
          </Button>
        </HeaderContentActions>
      </HeaderContent>
    </Header>
  )
}
