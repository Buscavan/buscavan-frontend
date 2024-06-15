// CPF validation function
export function validateCPF(cpf: string) {
  // Remove any non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '')

  if (cpf.length !== 11) {
    return false
  }

  // Check for invalid CPF patterns
  if (/^(\d)\1+$/.test(cpf)) {
    return false
  }

  let sum = 0
  let remainder

  // Validate first digit
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false
  }

  // Validate second digit
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false
  }

  return true
}
