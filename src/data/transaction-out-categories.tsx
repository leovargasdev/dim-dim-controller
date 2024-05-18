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

export default [
  {
    name: 'Alimentação',
    value: 'alimentacao',
    icon: <ForkKnife size={24} weight="regular" />,
    color: '#63399b'
  },
  {
    name: 'Assinaturas',
    value: 'assinaturas',
    icon: <Television size={24} weight="regular" />,
    color: '#ac4f2b'
  },
  {
    name: 'Educação',
    value: 'educacao',
    icon: <Books size={24} weight="regular" />,
    color: '#ec1b86'
  },
  {
    name: 'Investimento',
    value: 'investimento',
    icon: <ChartLine size={24} weight="regular" />,
    color: '#fcac00'
  },
  {
    name: 'Lazer',
    value: 'lazer',
    icon: <GameController size={24} weight="regular" />,
    color: '#909090'
  },
  {
    name: 'Moradia',
    value: 'moradia',
    icon: <House size={24} weight="regular" />,
    color: '#2acc71'
  },
  {
    name: 'Outros (gastos)',
    value: 'outros',
    icon: <CirclesFour size={24} weight="regular" />,
    color: '#ffffff'
  },
  {
    name: 'Pet',
    value: 'pet',
    icon: <PawPrint size={24} weight="regular" />,
    color: '#ffa600'
  },
  {
    name: 'Saúde',
    value: 'saude',
    icon: <FirstAidKit size={24} weight="regular" />,
    color: '#a62c34'
  },
  {
    name: 'Serviços',
    value: 'servicos',
    icon: <PaintRoller size={24} weight="regular" />,
    color: '#245c2c'
  },
  {
    name: 'Transporte',
    value: 'transporte',
    icon: <Car size={24} weight="regular" />,
    color: '#808aff'
  },
  {
    name: 'Vestuário',
    value: 'vestuario',
    icon: <TShirt size={24} weight="regular" />,
    color: '#1c60ca'
  },
  {
    name: 'Viagem',
    value: 'viagem',
    icon: <Airplane size={24} weight="regular" />,
    color: '#50e2b1'
  }
]
