import { useController, useFormContext } from 'react-hook-form'

import { ErrorMessage } from 'components/Form'
import { TransationType } from 'types/transation'

import styles from './styles.module.scss'
import { CaretDown, CaretUp } from '@phosphor-icons/react'

export const SelectTransactionType = () => {
  const { control } = useFormContext()
  const { field, fieldState } = useController({ name: 'type', control })

  const error = fieldState.error?.message
  const isError = typeof error === 'string'

  const onChangeType = (type: TransationType): void => {
    field.onChange(type)
  }

  return (
    <fieldset className={styles.container}>
      <label htmlFor="type">Tipo de transação</label>

      <div className={styles.options}>
        <button
          type="button"
          onClick={() => onChangeType('in')}
          // eslint-disable-next-line prettier/prettier
          className={`${styles.option__in} ${field.value === 'in' && styles.active}`}
        >
          <CaretUp size={24} weight="bold" />
          Entrada
        </button>
        <button
          type="button"
          onClick={() => onChangeType('out')}
          // eslint-disable-next-line prettier/prettier
          className={`${styles.option__out} ${field.value === 'out' && styles.active}`}
        >
          <CaretDown size={24} weight="bold" />
          Saída
        </button>
      </div>

      {isError && <ErrorMessage message={error} />}
    </fieldset>
  )
}
