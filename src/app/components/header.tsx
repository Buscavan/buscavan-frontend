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
    <header className="w-full h-18 px-32 py-6 flex items-center justify-between border border-gray-300">
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
    </header>
  )
}
