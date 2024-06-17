'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { loginFormSchema } from '@/schemas/login-form-schema'
import { CPFInput } from '@/components/application/cpf-input'
import ErrorLabel from '@/app/app/_components/error-label'

export function LoginForm() {
  const { login: loginAuth } = useAuth()
  const [ocult, setOcult] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  })

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    await loginAuth(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <fieldset className="space-y-0.5">
        <CPFInput
          name="cpf"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
      </fieldset>

      <fieldset className="space-y-0.5">
        <Label htmlFor="password">Senha</Label>

        <div className="relative">
          <Input
            id="password"
            type={ocult ? 'text' : 'password'}
            placeholder="Digite sua senha"
            className="pr-10"
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

        {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
      </fieldset>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
        {isSubmitting ? 'Entrando...' : 'Entrar na plataforma'}
      </Button>
    </form>
  )
}
