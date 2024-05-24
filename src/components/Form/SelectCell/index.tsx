import type { Option } from 'types/global'
import { ErrorMessage } from 'components/Form'
import { useController, useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface OptionCell extends Option {
  icon: React.ReactNode
  color?: string
}

interface SelectCellProps {
  name: string
  label: string
  options: OptionCell[]
  externalEvent?: (value: string) => void
}

export const SelectCell = ({
  name,
  label,
  options,
  externalEvent = undefined
}: SelectCellProps) => {
  const { control } = useFormContext()
  const { field, fieldState } = useController({ name, control })

  const error = fieldState.error?.message
  const isError = typeof error === 'string'

  const handleStyle = (category: OptionCell) => {
    if (field.value === category.value) {
      const color = category?.color || '#1C60CA'

      return {
        borderColor: color + '91',
        background: color
      }
    }

    return {}
  }

  const onClick = (value: string) => {
    field.onChange(value)
    externalEvent && externalEvent(value)
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
            aria-selected={field.value === option.value}
            onClick={() => onClick(option.value)}
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
