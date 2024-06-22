'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  TravelCard,
  TravelCardContent,
  TravelCardDescription,
  TravelCardHeader,
  TravelCardImage,
  TravelCardInfo,
  TravelCardPrice,
  TravelCardTitle,
} from './travel-card'
import TravelDetailsModal from './travel-details-modal'
import { api } from '@/api/axios'
import { endpoints } from '@/api/endpoints'
import Pagination from '@/components/application/pagination'
import { PiSmileySad } from 'react-icons/pi'

export interface Trip {
  id: number
  origemId: number
  destinoId: number
  dataInicial: string
  dataFinal: string
  valor: number
  localEmbarqueIda: string
  localEmbarqueVolta: string
  descricao: string
  fotoDestinoUrl: string
  createdAt: string
  updatedAt: string
  veiculoId: number
  usuarioId: string
  passageiros: number
  veiculo: {
    id: number
    modelo: string
    placa: string
    capacidade: number
    fotoVeiculoUrl: string
    createdAt: string
    updatedAt: string
    motoristaCPF: string
    motorista: {
      phone: string | null
    }
  }
  origem: {
    id: number
    nome: string
    uf: number
    ibge: number
    lat_lon: string
    cod_tom: number
  }
  destino: {
    id: number
    nome: string
    uf: number
    ibge: number
    lat_lon: string
    cod_tom: number
  }
}

const TripsList: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 9

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get<Trip[]>(
          `${endpoints.listTrips}?page=${currentPage}&pageSize=${pageSize}`,
        )
        setTrips(response.data)
        setTotalPages(Math.ceil(response.data.length / pageSize))
      } catch (error) {
        console.error('Error fetching trips:', error)
      }
    }

    fetchTrips()
  }, [currentPage])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>

        {trips && trips.length > 0 && (
          <CardContent className="grid grid-cols-3 gap-4">
            {trips.map((trip) => (
              <Dialog key={trip.id}>
                <DialogTrigger asChild>
                  <TravelCard>
                    <TravelCardImage url={trip.fotoDestinoUrl} />
                    <TravelCardContent>
                      <TravelCardHeader>
                        <TravelCardTitle>
                          {trip.origem.nome} to {trip.destino.nome}
                        </TravelCardTitle>
                        <TravelCardPrice>
                          R$ {trip.valor.toFixed(2)}
                        </TravelCardPrice>
                      </TravelCardHeader>
                      <TravelCardInfo
                        initialDate={new Date(
                          trip.dataInicial,
                        ).toLocaleDateString('pt-BR')}
                        endDate={new Date(trip.dataFinal).toLocaleDateString(
                          'pt-BR',
                        )}
                        passengers={trip.veiculo.capacidade || 0}
                      />
                      <TravelCardDescription>
                        {trip.descricao}
                      </TravelCardDescription>
                    </TravelCardContent>
                  </TravelCard>
                </DialogTrigger>
                <TravelDetailsModal id={trip.id} />
              </Dialog>
            ))}
          </CardContent>
        )}

        {(!trips || trips.length === 0) && (
          <CardContent>
            <div className="mx-auto font-medium flex flex-col gap-2 items-center justify-center text-zinc-700 dark:text-zinc-300">
              <p className="text-center">
                Não encontramos nenhuma viagem, <br /> tente outra pesquisa!
              </p>
              <PiSmileySad className="w-5 h-5" />
            </div>
          </CardContent>
        )}
      </Card>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  )
}

export default TripsList
