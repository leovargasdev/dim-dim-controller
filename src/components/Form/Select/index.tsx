import * as SelectRadix from '@radix-ui/react-select'
import { CheckCheck, ChevronDown, ChevronUp } from 'lucide-react'

import styles from './styles.module.scss'

const SelectItem = ({ children, ...props }: any) => (
  <SelectRadix.Item {...props}>
    <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    <SelectRadix.ItemIndicator className={styles.SelectItemIndicator}>
      <CheckCheck />
    </SelectRadix.ItemIndicator>
  </SelectRadix.Item>
)

export const Select = () => (
  <fieldset className={styles.container}>
    <label>Categoria</label>
    <SelectRadix.Root>
      <SelectRadix.Trigger className={styles.SelectTrigger} aria-label="Food">
        <SelectRadix.Value placeholder="Selecione..." />
        <SelectRadix.Icon className={styles.SelectIcon}>
          <ChevronDown />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>
      <SelectRadix.Portal>
        <SelectRadix.Content className={styles.SelectContent}>
          <SelectRadix.ScrollUpButton className={styles.SelectScrollButton}>
            <ChevronUp />
          </SelectRadix.ScrollUpButton>
          <SelectRadix.Viewport className={styles.SelectViewport}>
            <SelectRadix.Group>
              <SelectRadix.Label className={styles.SelectLabel}>
                Fruits
              </SelectRadix.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectRadix.Group>

            <SelectRadix.Separator className={styles.SelectSeparator} />

            <SelectRadix.Group>
              <SelectRadix.Label className={styles.SelectLabel}>
                Vegetables
              </SelectRadix.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </SelectRadix.Group>

            <SelectRadix.Separator className={styles.SelectSeparator} />

            <SelectRadix.Group>
              <SelectRadix.Label className={styles.SelectLabel}>
                Meat
              </SelectRadix.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </SelectRadix.Group>
          </SelectRadix.Viewport>
          <SelectRadix.ScrollDownButton className={styles.SelectScrollButton}>
            <ChevronDown />
          </SelectRadix.ScrollDownButton>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  </fieldset>
)
