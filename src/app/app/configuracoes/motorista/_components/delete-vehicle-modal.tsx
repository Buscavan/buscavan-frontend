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

interface DeleteVehicleModalProps {
  vehicleId: string
}

export function DeleteVehicleModal({ vehicleId }: DeleteVehicleModalProps) {
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        endpoints.deleteVehicle.replace('{id}', vehicleId),
      )
      if (response) {
        toast({
          title: 'Veículo excluído!',
          description: 'O veículo foi excluído com sucesso.',
        })
      } else {
        throw new Error('Failed to delete vehicle')
      }
    } catch (err) {
      toast({
        title: 'Algo deu errado!',
        description: 'Falha ao excluir o veículo. Tente novamente.',
        variant: 'destructive',
      })
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Atenção!</AlertDialogTitle>
        <AlertDialogDescription>
          Você tem certeza que deseja excluir este veículo?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
