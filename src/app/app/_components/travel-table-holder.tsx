'use client'

import React, { useEffect, useState } from 'react'
import { TravelsTable } from './travels-table'
import { columns } from '../columns'
import { api } from '@/api/axios'
import { endpoints } from '@/api/endpoints'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/use-toast'

export default function TravelTableHolder() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [data, setData] = useState([])

  useEffect(() => {
    if (user?.cpf) {
      fetchTrips()
    }
  }, [user?.cpf])

  const fetchTrips = async () => {
    try {
      const response = await api.get(
        endpoints.getTripsByDriver.replace('{id}', user.cpf),
      )
      const trips = response.data.map((trip) => ({
        id: trip.id.toString(),
        destiny: trip.destinoId, // Update this if you have a function to convert destinoId to city name
        exitLocale: trip.origemId, // Update this if you have a function to convert origemId to city name
        vehicle: trip.veiculoId, // Update this if you have a function to convert veiculoId to vehicle name
        initialDate: new Date(trip.dataInicial).toLocaleDateString(),
        endDate: new Date(trip.dataFinal).toLocaleDateString(),
        value: trip.valor,
      }))
      setData(trips)
    } catch (error) {
      console.error('Error fetching trips:', error)
      toast({
        title: 'Erro!',
        description: 'Houve um erro ao buscar as viagens.',
      })
    }
  }

  return <TravelsTable columns={columns} data={data} />
}
