import { Button } from '@/components/ui/button'
import { LoginForm } from './_components/login-form'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <section className="p-10 flex justify-center items-center">
      <div className="max-w-sm w-full flex flex-col items-center space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Faça Login na Buscavan</h1>
          <p className="text-muted-foreground">
            Preencha os dados abaixo para entrar no sistema
          </p>
        </div>

        <LoginForm />

        <div className="w-full flex items-center space-x-3">
          <Separator className="flex-1" />

          <p className="text-xs text-muted-foreground">OU</p>

          <Separator className="flex-1" />
        </div>

        <Button variant="outline" className="w-full" asChild>
          <Link href="/auth/register">Cadastre-se em nossa plataforma</Link>
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Ao continuar, você concorda com os Termos de Serviço e Políticas de
          Privacidade
        </p>
      </div>
    </section>
  )
}
