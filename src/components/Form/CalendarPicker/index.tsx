import { ptBR } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import { useController, useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'
import 'react-day-picker/dist/style.css'

interface CalendarPickerProps {
  name: string
}

export const CalendarPicker = ({ name }: CalendarPickerProps) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  const onChange = (event: Date | undefined): void => {
    if (event !== undefined) {
      field.onChange(event)
    }
  }

  return (
    <fieldset className={styles.container}>
      <DayPicker
        locale={ptBR}
        mode="single"
        selected={field.value}
        onSelect={onChange}
      />
    </fieldset>
  )
}
