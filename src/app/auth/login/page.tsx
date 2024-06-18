import { Button } from '@/components/ui/button'
import { LoginForm } from './_components/login-form'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog'
import { LuBaggageClaim } from 'react-icons/lu'
import { BiBus } from 'react-icons/bi'

export const metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <section className="p-6 flex justify-center items-center">
      <div className="sm:max-w-sm w-full flex flex-col items-center space-y-6 sm:space-y-8">
        <div className="space-y-1 sm:space-y-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Faça Login na Buscavan
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Preencha os dados abaixo para entrar no sistema
          </p>
        </div>

        <LoginForm />

        <div className="w-full flex items-center space-x-3">
          <Separator className="flex-1" />

          <p className="text-xs text-muted-foreground">OU</p>

          <Separator className="flex-1" />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full hover:cursor-pointer"
              asChild
            >
              <p>Cadastre-se em nossa plataforma</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Você é?</DialogTitle>
              <DialogDescription>
                Escolha como prosseguir com o cadastro
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between items-center gap-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/auth/register/partner" className="mr-2 flex gap-2">
                  <BiBus />
                  <p>Motorista</p>
                </Link>
              </Button>
              <Button variant="default" className="w-full" asChild>
                <Link href="/auth/register" className="mr-2 flex gap-2">
                  <LuBaggageClaim />
                  <p>Passageiro</p>
                </Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
