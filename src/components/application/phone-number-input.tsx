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

function formatPhoneNumber(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})$/, '$1-$2')
}

interface PhoneNumberInputProps<T extends FieldValues> {
  register: UseFormRegister<T>
  name: Path<T>
  defaultValue?: string
  errors: FieldErrors<T>
  setValue: UseFormSetValue<T>
  getValues: UseFormGetValues<T>
  className?: string
  disabled?: boolean
}

export function PhoneNumberInput<T extends FieldValues>({
  register,
  name,
  errors,
  setValue,
  getValues,
  defaultValue,
  className,
  disabled,
}: PhoneNumberInputProps<T>) {
  const [value, setValueState] = useState<string>(defaultValue || '')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(event.target.value)
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
      <Label htmlFor={name as string}>Telefone</Label>
      <Input
        id={name as string}
        placeholder="(00) 00000-0000"
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
