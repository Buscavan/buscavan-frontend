import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageHeaderTitle,
} from '@/components/application/page'
import { Metadata } from 'next'
import { TravelsTable } from './_components/travels-table'
import { columns } from './columns'

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
        <TravelsTable columns={columns} data={[]} />
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
