import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Link } from 'next/link'
import { BiBus } from 'react-icons/bi'
import { LuBaggageClaim } from 'react-icons/lu'

export function RegisterOptionModal() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Você é?</DialogTitle>
        <DialogDescription>
          Escolha como prosseguir com o cadastro
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-between items-center gap-3">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/auth/cadastro/parceiro" className="mr-2 flex gap-2">
            <BiBus />
            <p>Motorista</p>
          </Link>
        </Button>
        <Button variant="default" className="w-full" asChild>
          <Link href="/auth/cadastro" className="mr-2 flex gap-2">
            <LuBaggageClaim />
            <p>Passageiro</p>
          </Link>
        </Button>
      </div>
    </DialogContent>
  )
}
