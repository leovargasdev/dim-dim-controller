import { CaretUp, CaretDown } from '@phosphor-icons/react'

export default [
  {
    name: 'Despesa',
    value: 'out',
    icon: <CaretDown size={24} weight="bold" />,
    color: '#A62C34'
  },
  {
    name: 'Receita',
    value: 'in',
    icon: <CaretUp size={24} weight="bold" />,
    color: '#0F8E53'
  }
]
