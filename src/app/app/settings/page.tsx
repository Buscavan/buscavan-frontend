import { Metadata } from 'next'
import FormSettings from './_components/form-settings'

export const metadata: Metadata = {
  title: 'Configurações',
}

export default function Settings() {
  return <FormSettings />
}
