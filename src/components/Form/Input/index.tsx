import { ChangeEvent, InputHTMLAttributes } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { ErrorMessage } from 'components/Form'

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  mask?: null | ((value: string) => string)
}

export const Input = ({ name, label, mask = null, ...rest }: InputProps) => {
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

  return (
    <fieldset className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className={isError ? styles.error : ''}
        aria-invalid={isError}
        {...rest}
        {...field}
        onChange={onChange}
      />

      <ErrorMessage message={error} />
    </fieldset>
  )
}
