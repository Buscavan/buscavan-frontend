'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchFormSchema = z.object({
  destination: z.string(),
})

type SearchForm = z.infer<typeof searchFormSchema>

export function BannerSearchForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchForm>()

  async function onSubmit(data: SearchForm) {
    localStorage.setItem('searchData', JSON.stringify(data))

    router.push('/pesquisa')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-center justify-center gap-3"
    >
      <Input
        placeholder="Para onde deseja ir?"
        className="max-w-80 w-full bg-zinc-50"
        {...register('destination')}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-zinc-700 hover:bg-zinc-700/90"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 mr-2 animate-spin'" />
        ) : (
          <Search className="size-4 mr-2" />
        )}
        {isSubmitting ? 'Pesquisando...' : 'Pesquisar'}
      </Button>
    </form>
  )
}
