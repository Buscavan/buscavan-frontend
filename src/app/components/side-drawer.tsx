import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import { BsHouse } from 'react-icons/bs'

export function SideDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant={'ghost'} className="aspect-square p-1">
          <GiHamburgerMenu className="w-full h-full" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen top-0 left-0 right-auto mt-0 w-[500px] rounded-none">
        <ScrollArea className="h-screen">
          <div className="mx-auto w-full p-5">
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0 flex gap-4 flex-col">
              <Link href={'/inicio'}>
                <Button variant="outline" className="justify-start w-full px-2">
                  <BsHouse className="mr-2 w-4 h-4" /> Página Inicial
                </Button>
              </Link>
              <Link href={'/meu-painel'}>
                <Button variant="outline" className="justify-start w-full px-2">
                  <HiOutlineComputerDesktop className="mr-2 w-4 h-4" /> Meu
                  Painel
                </Button>
              </Link>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
