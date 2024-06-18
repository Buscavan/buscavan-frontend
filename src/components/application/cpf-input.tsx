import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, ChangeEvent, useEffect } from 'react'
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import ErrorLabel from './error-label'

function formatCPF(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

interface CPFInputProps<T extends FieldValues> {
  register: UseFormRegister<T>
  name: Path<T>
  errors: FieldErrors<T>
  setValue: UseFormSetValue<T>
  getValues: UseFormGetValues<T>
  className?: string
  disabled?: boolean
}

export function CPFInput<T extends FieldValues>({
  register,
  name,
  errors,
  setValue,
  getValues,
  className,
  disabled,
}: CPFInputProps<T>) {
  const [value, setValueState] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(event.target.value)
    setValueState(formattedValue)
    setValue(name, formattedValue as PathValue<T, Path<T>>, {
      shouldValidate: true,
    }) // Trigger validation
  }

  useEffect(() => {
    setValueState(getValues(name) || '')
  }, [getValues, name])

  return (
    <div className={className}>
      <Label htmlFor={name as string}>CPF</Label>
      <Input
        id={name as string}
        placeholder="000.000.000-00"
        value={value}
        disabled={disabled}
        {...register(name)}
        onChange={handleChange}
      />
      {errors[name] && (
        <ErrorLabel>{errors[name]?.message as React.ReactNode}</ErrorLabel>
      )}
    </div>
  )
}
