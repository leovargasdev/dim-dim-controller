import { ChangeEvent, InputHTMLAttributes, useMemo, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import type { Option } from 'types/global'
import { ErrorMessage } from 'components/Form'

import styles from './styles.module.scss'
import { searchValueInArray } from 'utils/array'

interface AutocompleteProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  options: Option[]
  onSelected: (value: string) => void
}

export const Autocomplete = ({
  name,
  label,
  options,
  onSelected,
  ...rest
}: AutocompleteProps) => {
  const { control } = useFormContext()
  const { field, fieldState } = useController({ name, control })
  const [hasSelected, setHasSelected] = useState<boolean>(false)

  const error = fieldState.error?.message
  const isError = typeof error === 'string'

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    hasSelected && setHasSelected(false)
    field.onChange(event.target.value)
  }

  const filtredOptions = useMemo(() => {
    if (field.value.length === 0) {
      return []
    }

    const items: Option[] = searchValueInArray(options, 'name', field.value)
    const filtredRepeatItems = new Map(items.map(item => [item.name, item]))

    return Array.from(filtredRepeatItems.values())
  }, [options, field.value])

  const handleSelectedOption = (option: Option): void => {
    onSelected(option.value)
    field.onChange(option.name)
    setHasSelected(true)
  }

  return (
    <fieldset className={styles.container}>
      <label htmlFor={name}>{label}</label>

      <div className={styles.area}>
        <div
          className={styles.content}
          aria-invalid={isError}
          aria-expanded={filtredOptions.length > 0 && !hasSelected}
        >
          <input id={name} {...rest} {...field} onChange={onChange} />

          <ul className="scroll">
            {filtredOptions.map(op => (
              <li key={op.value}>
                <button type="button" onClick={() => handleSelectedOption(op)}>
                  {op.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ErrorMessage message={error} />
    </fieldset>
  )
}
