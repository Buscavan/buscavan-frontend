'use client'

import React, { useEffect, useState } from 'react'
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
import { api } from '@/api/axios'
import { endpoints } from '@/api/endpoints'
import Image from 'next/image'
import { Trip } from './trips-list'

interface TravelDetailsModalProps {
  id: number
}

const TravelDetailsModal: React.FC<TravelDetailsModalProps> = ({ id }) => {
  const [trip, setTrip] = useState<Trip | null>(null)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get<Trip>(
          endpoints.getTrip.replace('{id}', id.toString()),
        )
        setTrip(response.data)
      } catch (error) {
        console.error('Error fetching trip:', error)
      }
    }

    fetchTrip()
  }, [id])

  if (!trip) {
    return (
      <DialogContent className="max-w-2xl w-full">
        <div className="flex justify-center items-center h-full">
          <span>Carregando...</span>
        </div>
      </DialogContent>
    )
  }

  return (
    <DialogContent className="max-w-2xl w-full">
      <DialogHeader>
        <DialogTitle>
          {trip.localEmbarqueIda} to {trip.localEmbarqueVolta}
        </DialogTitle>
        <DialogDescription>
          Veja abaixo todos os detalhes da viagem
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-3 gap-x-2 gap-y-4">
        {trip.fotoDestinoUrl ? (
          <div className="col-span-full h-40 relative">
            <Image
              src={trip.fotoDestinoUrl}
              alt="Imagem da Cidade"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ) : (
          <div className="col-span-full h-40 flex justify-center items-center bg-muted rounded-md text-muted-foreground">
            <AlertCircle className="size-5 mr-2" />
            <span className="text-sm">Sem foto</span>
          </div>
        )}

        <div className="col-span-1 space-y-0.5">
          <Label>Local de Saída</Label>
          <p className="text-sm text-muted-foreground">
            {trip.localEmbarqueIda}
          </p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Data</Label>
          <p className="text-sm text-muted-foreground">
            {new Date(trip.dataInicial).toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Valor</Label>
          <p className="text-sm text-muted-foreground">
            R$ {trip.valor.toFixed(2)}
          </p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Veículo</Label>
          <p className="text-sm text-muted-foreground">{trip.veiculoId}</p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Placa</Label>
          <p className="text-sm text-muted-foreground">EVA1234</p>
        </div>

        <div className="col-span-1 space-y-0.5">
          <Label>Passageiros</Label>
          <p className="text-sm text-muted-foreground">
            {trip.veiculo.capacidade}
          </p>
        </div>

        <div className="col-span-full space-y-0.5">
          <Label>Descrição</Label>
          <p className="text-sm text-muted-foreground text-justify">
            {trip.descricao}
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

export default TravelDetailsModal
