'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { DeleteVehicleModal } from './_components/delete-vehicle-modal'
import { Vehicle } from '@/types/Vehicle'

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: 'model',
    header: 'Modelo',
  },
  {
    accessorKey: 'plate',
    header: 'Placa',
  },
  {
    accessorKey: 'capacity',
    header: 'Capacidade',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const vehicle = row.original

      return (
        <div className="flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <Trash2 className="size-[1.125rem] text-red-600 dark:text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <DeleteVehicleModal vehicleId={vehicle.id} />
          </AlertDialog>
        </div>
      )
    },
  },
]
