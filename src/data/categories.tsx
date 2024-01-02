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
  User,
  GameController,
  PaintRoller,
  Television,
  House
} from '@phosphor-icons/react'

export default [
  {
    name: 'Alimentação',
    value: 'alimentacao',
    icon: <ForkKnife size={24} weight="regular" />
  },
  {
    name: 'Assinaturas',
    value: 'assinaturas',
    icon: <Television size={24} weight="regular" />
  },
  {
    name: 'Educação',
    value: 'educacao',
    icon: <Books size={24} weight="regular" />
  },
  {
    name: 'Investimento',
    value: 'investimento',
    icon: <ChartLine size={24} weight="regular" />
  },
  {
    name: 'Lazer',
    value: 'lazer',
    icon: <GameController size={24} weight="regular" />
  },
  {
    name: 'Moradia',
    value: 'moradia',
    icon: <House size={24} weight="regular" />
  },
  {
    name: 'Outros (gastos)',
    value: 'outros',
    icon: <CirclesFour size={24} weight="regular" />
  },
  {
    name: 'Pessoal',
    value: 'pessoal',
    icon: <User size={24} weight="regular" />
  },
  {
    name: 'Pet',
    value: 'pet',
    icon: <PawPrint size={24} weight="regular" />
  },
  {
    name: 'Saúde',
    value: 'saude',
    icon: <FirstAidKit size={24} weight="regular" />
  },
  {
    name: 'Serviços',
    value: 'servicos',
    icon: <PaintRoller size={24} weight="regular" />
  },
  {
    name: 'Transporte',
    value: 'transporte',
    icon: <Car size={24} weight="regular" />
  },
  {
    name: 'Vestuário',
    value: 'vestuario',
    icon: <TShirt size={24} weight="regular" />
  },
  {
    name: 'Viagem',
    value: 'viagem',
    icon: <Airplane size={24} weight="regular" />
  }
]
