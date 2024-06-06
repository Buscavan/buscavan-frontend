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
import { GiHamburgerMenu } from 'react-icons/gi'

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
              <DrawerTitle>Título</DrawerTitle>
              <DrawerDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio, facilis quidem voluptatem, enim vel beatae
                asperiores aspernatur mollitia error esse nulla culpa ea
                inventore necessitatibus exercitationem libero dolor amet porro?
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 space-y-4">
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 1</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 2</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 3</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 4</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 4</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 5</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 6</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 7</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 8</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 9</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 10</p>
              </div>
              <div className="bg-muted flex items-center justify-center rounded-lg h-32">
                <p>Image 11</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
