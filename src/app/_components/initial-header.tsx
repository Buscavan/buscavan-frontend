'use client'

import {
  Header,
  HeaderContent,
  HeaderContentActions,
  HeaderContentNav,
} from '@/components/application/header'
import { Logo } from '@/components/application/logo'
import { ModeToggle } from '@/components/application/mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function InitialHeader() {
  return (
    <Header>
      <HeaderContent>
        <HeaderContentNav>
          <Logo path="/" />
        </HeaderContentNav>

        <HeaderContentActions>
          <ModeToggle />

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
