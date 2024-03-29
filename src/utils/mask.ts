export const maskOnlyNumber = (value: string): string => {
  return value.replace(/(\D)/g, '')
}

export const maskNumber = (value: string): number => {
  return Number(maskOnlyNumber(value))
}

export const maskMoney = (data: string): string => {
  const value = maskOnlyNumber(data)

  if (!value) {
    return 'R$ '
  }

  const size = value.length

  const end = value.substring(size - 2, size)
  const start = value.substring(0, size - 2)

  const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: end.length <= 1 ? 1 : 2
  })

  const price = parseFloat([start, end].join('.'))

  return moneyFormatter.format(price)
}
