import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { AlertCircle, Phone } from 'lucide-react'

interface TravelDetailsModalProps {
  id: number
}

export function TravelDetailsModal({ id }: TravelDetailsModalProps) {
  return (
    <DialogContent className="max-w-2xl w-full">
      <DialogHeader>
        <DialogTitle>Balneário Camboriú ( TESTE: {id} )</DialogTitle>
        <DialogDescription>
          Veja abaixo todos os detalhes da viagem
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-3 gap-x-2 gap-y-4">
        {/* {url ? (
          <Image
            src={url}
            width={1920}
            height={1080}
            alt="Imagem da Cidade"
            className="col-span-full h-40 object-cover object-center rounded-md"
          />
        ) : (
          <div className="col-span-full h-40 flex justify-center items-center bg-muted rounded-md text-muted-foreground">
            <AlertCircle className="size-5 mr-2" />
            <span className="text-sm">Sem foto</span>
          </div>
        )} */}
        <div className="col-span-full h-40 flex justify-center items-center bg-muted rounded-md text-muted-foreground">
          <AlertCircle className="size-5 mr-2" />
          <span className="text-sm">Sem foto</span>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Local de Saída</Label>
          <p className="text-sm text-muted-foreground">Em frente ao Sesi</p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Data</Label>
          <p className="text-sm text-muted-foreground">16/06/2024</p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Valor</Label>
          <p className="text-sm text-muted-foreground">R$ 1.000,00</p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Veículo</Label>
          <p className="text-sm text-muted-foreground">Mercedes Sprinter</p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Placa</Label>
          <p className="text-sm text-muted-foreground">EVA1234</p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Passageiros</Label>
          <p className="text-sm text-muted-foreground">14</p>
        </div>

        <div className="col-span-full space-y-0.5">
          <Label>Descrição</Label>
          <p className="text-sm text-muted-foreground text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
            autem libero optio est et consequatur, totam culpa! Impedit, rem
            voluptatum. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Magnam autem libero optio est et consequatur, totam culpa!
            Impedit, rem voluptatum.
          </p>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Voltar</Button>
        </DialogClose>
        <Button>
          <Phone className="size-4 mr-2" />
          Entrar em Contato
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
