'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Term {
  id: number
  title: string
  description: string
}

export function TermsAndPrivacy() {
  return (
    <div className="text-center">
      <p className="text-xs sm:text-sm text-muted-foreground">
        Ao continuar, você concorda com os <TermsOfServiceModal /> e
        <PrivacyPolicyModal />
      </p>
    </div>
  )
}

function TermsOfServiceModal() {
  const [terms, setTerms] = useState<Term[]>([])

  useEffect(() => {
    async function fetchTerms() {
      const response = await fetch('/api/data')
      if (response.ok) {
        const data = await response.json()
        setTerms(data.terms)
      } else {
        console.error('Failed to fetch terms of service')
      }
    }
    fetchTerms()
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 underline p-0 h-6"
        >
          Termos de Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Termos de Serviço</DialogTitle>
        </DialogHeader>
        <DialogDescription className="max-h-[60vh] overflow-y-auto">
          {terms.map((term) => (
            <div key={term.id}>
              <h3 className="font-bold mt-2">{term.title}</h3>
              <p>{term.description}</p>
            </div>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

function PrivacyPolicyModal() {
  const [policies, setPolicies] = useState<Term[]>([])

  useEffect(() => {
    async function fetchPolicies() {
      const response = await fetch('/api/data')
      if (response.ok) {
        const data = await response.json()
        setPolicies(data.politics)
      } else {
        console.error('Failed to fetch privacy policies')
      }
    }
    fetchPolicies()
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 underline p-0 h-6"
        >
          Políticas de Privacidade
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Políticas de Privacidade</DialogTitle>
        </DialogHeader>
        <DialogDescription className="max-h-[60vh] overflow-y-auto">
          {policies.map((policy) => (
            <div key={policy.id}>
              <h3 className="font-bold mt-2">{policy.title}</h3>
              <p>{policy.description}</p>
            </div>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
