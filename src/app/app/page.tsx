import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageHeaderTitle,
} from '@/components/application/page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Viagens',
}

export default function Travels() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageHeaderTitle>Viagens</ApplicationPageHeaderTitle>
      </ApplicationPageHeader>

      <ApplicationPageContent>
        Meus commits foram comidos, só pra atualizar
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
