export const maskMoney = (data: string): string => {
  const size = data.length
  const value = data.replace(/(\D)/g, '')

  if (size >= 11) {
    return value.replace(/^(\d{1,5})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3,$4')
  }

  if (size >= 6) {
    return value.replace(/^(\d{1,3})(\d{3})(\d{2})$/, '$1.$2,$3')
  }

  return value.replace(/^(\d{1,3})(\d{2})$/, '$1,$2')
}
