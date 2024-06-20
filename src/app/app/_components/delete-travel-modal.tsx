import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

interface DeleteTravelModalProps {
  travelId: string
}

export function DeleteTravelModal({ travelId }: DeleteTravelModalProps) {
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
          onClick={() => console.log(travelId)}
          className="bg-red-800 text-white"
        >
          Deletar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
