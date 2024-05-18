import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@radix-ui/react-icons'
import type { Option } from 'types/global'
import * as SelectRadix from '@radix-ui/react-select'
import { useController, useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

const SelectItem = ({ children, ...rest }: SelectRadix.SelectItemProps) => (
  <SelectRadix.Item {...rest} className={styles.item}>
    <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    <SelectRadix.ItemIndicator className={styles.item__indicator}>
      <CheckIcon />
    </SelectRadix.ItemIndicator>
  </SelectRadix.Item>
)

interface SelectProps {
  options: Option[]
  name: string
  label: string
}

export const Select = ({ name, label, options }: SelectProps) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  return (
    <fieldset className={styles.container}>
      <label>{label}</label>
      <SelectRadix.Root
        name={name}
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectRadix.Trigger className={styles.trigger}>
          <SelectRadix.Value placeholder="Selecione..." />
          <SelectRadix.Icon className={styles.SelectIcon}>
            <ChevronDownIcon />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
          <SelectRadix.Content className={styles.content}>
            <SelectRadix.ScrollUpButton className={styles.scroll__button}>
              <ChevronUpIcon />
            </SelectRadix.ScrollUpButton>

            <SelectRadix.Viewport className={styles.viewport}>
              {options.map(option => (
                <SelectItem value={option.value} key={option.value}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectRadix.Viewport>

            <SelectRadix.ScrollDownButton className={styles.scroll__button}>
              <ChevronDownIcon />
            </SelectRadix.ScrollDownButton>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </fieldset>
  )
}
