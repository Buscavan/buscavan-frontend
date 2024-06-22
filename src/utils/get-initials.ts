export function getInitials(name: string): string {
  const nameParts = name.split(' ').filter((part) => part.length > 0)
  const initials = nameParts.map((part) => part.charAt(0).toUpperCase())

  return initials.join('')
}
