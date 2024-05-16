import { Button } from '@/components/ui/button'

export function AdBanner() {
  return (
    <div className="w-full h-20 bg-zinc-800 px-32 py-4 flex justify-between items-center fixed bottom-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <p className="flex-1 text-white font-medium text-lg">
        Anuncie em nossa plataforma e entre pro time da Buscavan!
      </p>
      <div className="flex-1 flex justify-end items-center h-full">
        <Button className="h-full" variant={'secondary'}>
          Cadastrar Veículos
        </Button>
      </div>
    </div>
  )
}
