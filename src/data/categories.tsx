import {
  Books,
  Briefcase,
  ChartLine,
  CirclesFour,
  CoatHanger,
  FirstAidKit,
  ForkKnife,
  GameController,
  House
} from '@phosphor-icons/react'

export default [
  {
    name: 'Alimentação',
    value: 'alimentacao',
    icon: <ForkKnife size={24} weight="regular" />
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
    name: 'Receita',
    value: 'receita',
    icon: <Briefcase size={24} weight="regular" />
  },
  {
    name: 'Saúde',
    value: 'saude',
    icon: <FirstAidKit size={24} weight="regular" />
  },
  {
    name: 'Vestuário',
    value: 'vestuario',
    icon: <CoatHanger size={24} weight="regular" />
  },
  {
    name: 'Outro ',
    value: 'outro',
    icon: <CirclesFour size={24} weight="regular" />
  }
]
