import { ErrorMessage } from 'components/Form'
import { useController, useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface Option {
  name: string
  value: string
  icon: React.ReactNode
  color?: string
}

interface SelectCellProps {
  name: string
  label: string
  options: Option[]
}

export const SelectCell = ({ name, label, options }: SelectCellProps) => {
  const { control } = useFormContext()
  const { field, fieldState } = useController({ name, control })

  const error = fieldState.error?.message
  const isError = typeof error === 'string'

  const handleStyle = (category: Option) => {
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
      <label htmlFor="type">{label}</label>

      <div className={styles.options}>
        {options.map(option => (
          <button
            type="button"
            key={option.value}
            style={handleStyle(option)}
            onClick={() => field.onChange(option.value)}
          >
            {option?.icon}
            {option.name}
          </button>
        ))}
      </div>

      {isError && <ErrorMessage message={error} />}
    </fieldset>
  )
}
