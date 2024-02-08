import React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import styles from './styles.module.scss'

interface TooltipProps {
  text: string
  children: React.ReactNode
}

export const Tooltip = ({ text, children }: TooltipProps) => (
  <RadixTooltip.Provider delayDuration={300}>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className={styles.content} sideOffset={5}>
          {text}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
)
