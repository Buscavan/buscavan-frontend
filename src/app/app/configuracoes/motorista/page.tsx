'use client'

import { useEffect, useState } from 'react'
import FormSettings from './_components/form-settings'
import { VehicleTable } from './_components/vehicle-table'
import { columns } from './columns'
import { api } from '@/api/axios'
import { endpoints } from '@/api/endpoints'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/use-toast'

export default function Driver() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [vehicles, setVehicles] = useState<
    { id: string; model: string; plate: string; capacity: number }[]
  >([])

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await api.get(
          endpoints.listVehicles.replace('{id}', user!.cpf.toString()),
        )
        if (response && response.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fetchedVehicles = response.data.map((vehicle: any) => ({
            id: vehicle.id,
            model: vehicle.modelo,
            plate: vehicle.placa,
            capacity: vehicle.capacidade,
          }))
          setVehicles(fetchedVehicles)
        } else {
          throw new Error('Failed to fetch vehicles')
        }
      } catch (err) {
        toast({
          title: 'Algo deu errado!',
          description: 'Falha ao buscar os veículos. Tente novamente.',
          variant: 'destructive',
        })
      }
    }

    if (user) {
      fetchVehicles()
    }
  }, [user, toast])

  return (
    <div className="flex flex-col gap-4">
      <FormSettings />
      <VehicleTable columns={columns} data={vehicles} />
    </div>
  )
}
