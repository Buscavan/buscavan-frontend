import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageHeaderTitle,
} from '@/components/application/page'
import { Metadata } from 'next'
import TravelTableHolder from './_components/travel-table-holder'

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
        <TravelTableHolder />
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
