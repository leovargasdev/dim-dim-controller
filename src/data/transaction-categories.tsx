import {
  PawPrint,
  Car,
  Books,
  Airplane,
  ChartLine,
  CirclesFour,
  TShirt,
  FirstAidKit,
  ForkKnife,
  GameController,
  PaintRoller,
  Television,
  House
} from '@phosphor-icons/react'

export const categoriesOut = [
  {
    name: 'Alimentação',
    value: 'alimentacao',
    icon: <ForkKnife size={24} weight="regular" />,
    color: '#63399b',
    type: 'in'
  },
  {
    name: 'Assinaturas',
    value: 'assinaturas',
    icon: <Television size={24} weight="regular" />,
    color: '#ac4f2b',
    type: 'in'
  },
  {
    name: 'Educação',
    value: 'educacao',
    icon: <Books size={24} weight="regular" />,
    color: '#ec1b86',
    type: 'in'
  },
  {
    name: 'Investimento',
    value: 'investimento-out',
    icon: <ChartLine size={24} weight="regular" />,
    color: '#fcac00',
    type: 'in'
  },
  {
    name: 'Lazer',
    value: 'lazer',
    icon: <GameController size={24} weight="regular" />,
    color: '#909090',
    type: 'in'
  },
  {
    name: 'Moradia',
    value: 'moradia',
    icon: <House size={24} weight="regular" />,
    color: '#2acc71',
    type: 'in'
  },
  {
    name: 'Outros (gastos)',
    value: 'outros',
    icon: <CirclesFour size={24} weight="regular" />,
    color: '#B3B5BC',
    type: 'in'
  },
  {
    name: 'Pet',
    value: 'pet',
    icon: <PawPrint size={24} weight="regular" />,
    color: '#ffa600',
    type: 'in'
  },
  {
    name: 'Saúde',
    value: 'saude',
    icon: <FirstAidKit size={24} weight="regular" />,
    color: '#a62c34',
    type: 'in'
  },
  {
    name: 'Serviços',
    value: 'servicos',
    icon: <PaintRoller size={24} weight="regular" />,
    color: '#245c2c',
    type: 'in'
  },
  {
    name: 'Transporte',
    value: 'transporte',
    icon: <Car size={24} weight="regular" />,
    color: '#808aff',
    type: 'in'
  },
  {
    name: 'Vestuário',
    value: 'vestuario',
    icon: <TShirt size={24} weight="regular" />,
    color: '#1c60ca',
    type: 'in'
  },
  {
    name: 'Viagem',
    value: 'viagem',
    icon: <Airplane size={24} weight="regular" />,
    color: '#50e2b1',
    type: 'in'
  }
]

export const categoriesIn = [
  {
    name: 'Cashback',
    value: 'cashback',
    icon: <ForkKnife size={24} weight="regular" />,
    color: '#63399b',
    type: 'out'
  },
  {
    name: 'Outros(ganhos)',
    value: 'outros',
    icon: <ForkKnife size={24} weight="regular" />,
    color: '#63399b',
    type: 'out'
  },
  {
    name: 'Prêmio',
    value: 'premio',
    icon: <ForkKnife size={24} weight="regular" />,
    color: '#63399b',
    type: 'out'
  },
  {
    name: 'Renda passiva(investimento)',
    value: 'investimento-in',
    icon: <ForkKnife size={24} weight="regular" />,
    color: '#63399b',
    type: 'out'
  },
  {
    name: 'Salário',
    value: 'salario',
    icon: <ForkKnife size={24} weight="regular" />,
    color: '#63399b',
    type: 'out'
  }
]

export const categories = categoriesIn.concat(categoriesOut)
