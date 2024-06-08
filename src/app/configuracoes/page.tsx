import { Metadata } from 'next'
import ConfiguracoesForm from './components/configuracoes-form'

export const metadata: Metadata = {
  title: 'Configurações',
}

export default function Configuracoes() {
  return <ConfiguracoesForm />
}
