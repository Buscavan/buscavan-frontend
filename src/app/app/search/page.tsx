import { Metadata } from 'next'
import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageHeaderTitle,
} from '@/components/application/page'
import { SearchForm } from './_components/search-form'

export const metadata: Metadata = {
  title: 'Viagens',
}

export default function Search() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageHeaderTitle>
          Pesquise sua viagem!
        </ApplicationPageHeaderTitle>
      </ApplicationPageHeader>

      <ApplicationPageContent>
        <SearchForm />
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
