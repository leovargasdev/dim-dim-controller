import { ChangeEvent, InputHTMLAttributes } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import type { Option } from 'types/global'
import { ErrorMessage } from 'components/Form'

import styles from './styles.module.scss'
import { searchValueInArray } from 'utils/array'

interface AutocompleteProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  mask?: null | ((value: string) => string)
  options: Option[]
}

export const Autocomplete = ({
  name,
  label,
  mask = null,
  options,
  ...rest
}: AutocompleteProps) => {
  const { control } = useFormContext()
  const { field, fieldState } = useController({ name, control })

  const error = fieldState.error?.message
  const isError = typeof error === 'string'

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let value = event.target.value

    if (mask !== null) {
      value = mask(value)
    }

    field.onChange(value)
  }

  const filtredOptions = searchValueInArray(options, 'name', field.value)

  return (
    <fieldset className={styles.container}>
      <label htmlFor={name}>{label}</label>

      <div className={styles.area}>
        <div
          className={styles.content}
          aria-invalid={isError}
          aria-expanded={!!field.value.length}
        >
          <input id={name} {...rest} {...field} onChange={onChange} />

          <ul className="scroll">
            {filtredOptions.map(op => (
              <li key={op.value}>
                <button type="button">{op.name}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ErrorMessage message={error} />
    </fieldset>
  )
}
