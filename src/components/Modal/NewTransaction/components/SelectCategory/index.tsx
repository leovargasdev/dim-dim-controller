import { useController, useFormContext } from 'react-hook-form'

import CATEGORIES from 'data/categories'
import { ErrorMessage } from 'components/Form'

import styles from './styles.module.scss'

export const SelectCategory = () => {
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
