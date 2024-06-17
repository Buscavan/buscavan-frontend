import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageHeaderTitle,
} from '@/components/application/page'
import { SettingsSidebar } from './_components/settings-sidebar'

export const metadata: Metadata = {
  title: 'Configurações',
}

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageHeaderTitle>Configurações</ApplicationPageHeaderTitle>
      </ApplicationPageHeader>
      <ApplicationPageContent>
        <div className="grid grid-cols-[14rem_1fr] gap-12">
          <SettingsSidebar />
          {children}
        </div>
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
