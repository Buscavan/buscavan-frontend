import { Metadata } from 'next'
import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageHeaderTitle,
} from '@/components/application/page'
import { SearchForm } from './_components/search-form'
import TripsList from './_components/trips-list'

export const metadata: Metadata = {
  title: 'Explorar',
}

export default function Search() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageHeaderTitle>Explorar</ApplicationPageHeaderTitle>
      </ApplicationPageHeader>

      <ApplicationPageContent>
        <SearchForm />
        <TripsList />
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
