'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const loginFormSchema = z.object({
  cpf: z.string().nonempty('Por favor, informe seu CPF'),
  password: z
    .string()
    .nonempty('Por favor, informe sua senha')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export function LoginForm() {
  const [ocult, setOcult] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  })

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <fieldset className="space-y-0.5">
        <Label htmlFor="cpf">CPF</Label>

        <Input id="cpf" placeholder="000.000.000-00" {...register('cpf')} />

        {errors.cpf && (
          <p className="text-sm text-red-500">{errors.cpf.message}</p>
        )}
      </fieldset>

      <fieldset className="space-y-0.5">
        <Label htmlFor="password">Senha</Label>

        <div className="relative">
          <Input
            id="password"
            type={ocult ? 'text' : 'password'}
            placeholder="Digite sua senha"
            {...register('password')}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute top-0 right-0"
            onClick={() => setOcult(!ocult)}
          >
            {ocult ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </Button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </fieldset>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="szie-4 mr-2 animate-spin" />}
        {isSubmitting ? 'Entrando...' : 'Entrar no Sistema'}
      </Button>
    </form>
  )
}
