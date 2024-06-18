'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Travel } from '@/types/Travel'
import { Trash2 } from 'lucide-react'

export const columns: ColumnDef<Travel>[] = [
  {
    accessorKey: 'destiny',
    header: 'Destino',
  },
  {
    accessorKey: 'exitLocale',
    header: 'Local de Saída',
  },
  {
    accessorKey: 'vehicle',
    header: 'Veículo',
  },
  {
    accessorKey: 'intialDate',
    header: 'Data de Ida',
  },
  {
    accessorKey: 'endDate',
    header: 'Data de Volta',
  },
  {
    accessorKey: 'value',
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const { value } = row.original

      const formattedValue = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })

      return <div className="font-semibold text-right">{formattedValue}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const travel = row.original

      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="size-8 p-0"
            onClick={() => console.log(travel.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )
    },
  },
]
