import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="w-full h-18 px-32 py-6 flex items-center justify-between">
      <Image src={'buscavan.svg'} width={140} height={20} alt="Buscavan Logo" />
      <div className="w-fit h-full flex items-center justify-end gap-2">
        <Link href={'auth/login'}>
          <Button variant={'ghost'}>Entrar</Button>
        </Link>
        <Link href={'auth/register'}>
          <Button>Cadastrar-se</Button>
        </Link>
      </div>
    </header>
  )
}
