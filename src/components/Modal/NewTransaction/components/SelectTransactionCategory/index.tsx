import {
  Books,
  ChartLine,
  CirclesFour,
  CoatHanger,
  FirstAidKit,
  ForkKnife,
  GameController,
  House
} from '@phosphor-icons/react'
import { useController, useFormContext } from 'react-hook-form'

import { ErrorMessage } from 'components/Form'

import styles from './styles.module.scss'

const CATEGORIES = [
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

export const SelectTransactionCategory = () => {
  const { control } = useFormContext()
  const { field, fieldState } = useController({ name: 'category', control })

  const error = fieldState.error?.message
  const isError = typeof error === 'string'

  const onChangeCategory = (category: string): void => {
    field.onChange(category)
  }

  return (
    <fieldset className={styles.container}>
      <label htmlFor="type">Tipo de transação</label>

      <div className={styles.options}>
        {CATEGORIES.map(category => (
          <button
            type="button"
            key={category.value}
            onClick={() => onChangeCategory(category.value)}
            // eslint-disable-next-line prettier/prettier
            className={field.value === category.value ? styles['category__' + category.value] : ''}
          >
            {category?.icon}
            {category.name}
          </button>
        ))}
      </div>

      {isError && <ErrorMessage message={error} />}
    </fieldset>
  )
}
