import React from 'react'
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/api/axios'
import { endpoints } from '@/api/endpoints'

interface DeleteTravelModalProps {
  travelId: string
}

export function DeleteTravelModal({ travelId }: DeleteTravelModalProps) {
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      await api.delete(endpoints.deleteTrip.replace('{id}', travelId))
      toast({
        title: 'Viagem Excluída',
        description: 'A viagem foi excluída com sucesso.',
      })
    } catch (error) {
      console.error('Error deleting trip:', error)
      toast({
        title: 'Erro!',
        description: 'Houve um erro ao excluir a viagem. Tente novamente.',
      })
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Atenção!</AlertDialogTitle>
        <AlertDialogDescription>
          Você realmente deseja excluir esta viagem? Esta ação é irreversível e
          todos os dados relacionados a esta viagem serão permanentemente
          perdidos.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className="bg-red-800 text-white"
        >
          Deletar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
