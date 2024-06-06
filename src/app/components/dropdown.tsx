import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { BsGear } from 'react-icons/bs'
import { useAuth } from '@/hooks/useAuth'
import {
  HiOutlineUser,
  HiOutlineComputerDesktop,
  HiOutlineInformationCircle,
  HiOutlineCog8Tooth,
} from 'react-icons/hi2'
import { HiOutlineLogout } from 'react-icons/hi'
import Link from 'next/link'

export function Dropdown() {
  const { user, logout } = useAuth()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className="aspect-square p-2">
          <BsGear className="w-full h-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0" align="end">
        <div className="grid gap-2">
          <h4 className="leading-none px-3 py-3 text-sm font-semibold border-black/20 border-b">
            {user ? user.name : 'Carregando...'}
          </h4>
          <div className="p-1 pt-0 pb-2 border-black/20 border-b">
            <Link href={'/perfil'}>
              <Button variant="ghost" className="justify-start w-full px-2">
                <HiOutlineUser className="mr-2 w-4 h-4" /> Perfil
              </Button>
            </Link>
            <Link href={'/meu-painel'}>
              <Button variant="ghost" className="justify-start w-full px-2">
                <HiOutlineComputerDesktop className="mr-2 w-4 h-4" /> Meu Painel
              </Button>
            </Link>
            <Link href={'/sobre'}>
              <Button variant="ghost" className="justify-start w-full px-2">
                <HiOutlineInformationCircle className="mr-2 w-4 h-4" /> Sobre
              </Button>
            </Link>
            <Link href={'/configuracoes'}>
              <Button variant="ghost" className="justify-start w-full px-2">
                <HiOutlineCog8Tooth className="mr-2 w-4 h-4" /> Configurações
              </Button>
            </Link>
          </div>
          <div className="p-1 pt-0">
            <Button
              variant="destructive"
              className="justify-start w-full px-2"
              onClick={logout}
            >
              <HiOutlineLogout className="mr-2 w-4 h-4" /> Sair
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
