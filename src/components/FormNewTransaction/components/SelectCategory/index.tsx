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

  const handleStyle = (category: any) => {
    if (field.value === category.value) {
      const color = category?.color || '#1C60CA'
      return {
        borderColor: color + '91',
        background: color + '2d'
      }
    }

    return {}
  }

  return (
    <fieldset className={styles.container}>
      <label htmlFor="type">Categoria</label>

      <div className={styles.options}>
        {CATEGORIES.map(category => (
          <button
            type="button"
            key={category.value}
            onClick={() => onChangeCategory(category.value)}
            // eslint-disable-next-line prettier/prettier
            style={handleStyle(category)}
            // className={
            //   field.value === category.value
            //     ? styles['category__' + category.value]
            //     : ''
            // }
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
