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
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import { RegisterOptionModal } from './register-option-modal'

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

          <Dialog>
            <DialogTrigger asChild>
              <Button asChild>
                <Link href="/auth/cadastro">Cadastre-se já</Link>
              </Button>
            </DialogTrigger>
            <RegisterOptionModal />
          </Dialog>
        </HeaderContentActions>
      </HeaderContent>
    </Header>
  )
}
