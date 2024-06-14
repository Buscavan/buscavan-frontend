'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import { Dropdown } from './dropdown'
import { SideDrawer } from './side-drawer'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center bg-background border border-gray-300">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <div className="w-fit h-full flex items-center gap-2">
          {!user && <SideDrawer />}
          <Link href={'/'}>
            <Image
              src={'buscavan.svg'}
              width={140}
              height={20}
              alt="Buscavan Logo"
            />
          </Link>
        </div>
        <div className="w-fit h-full flex items-center justify-end gap-2">
          {!user ? (
            <Dropdown />
          ) : (
            <>
              <Link href={'auth/login'}>
                <Button variant={'ghost'}>Entrar</Button>
              </Link>
              <Link href={'auth/register'}>
                <Button>Cadastrar-se</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
