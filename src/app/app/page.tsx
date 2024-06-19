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
        <TravelsTable
          columns={columns}
          data={[
            {
              id: '1',
              destiny: 'Rio de Janeiro',
              exitLocale: 'São Paulo',
              vehicle: 'Ônibus',
              initialDate: '16/06/2026',
              endDate: '16/06/2026',
              value: 150.0,
            },
          ]}
        />
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
