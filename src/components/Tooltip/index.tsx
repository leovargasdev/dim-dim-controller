import React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'

import styles from './styles.module.scss'

interface TooltipProps {
  text: string | React.ReactNode
  sideOffset?: number
  children: React.ReactNode
}

export const Tooltip = ({ text, children, sideOffset = 5 }: TooltipProps) => (
  <RadixTooltip.Provider delayDuration={300}>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          sideOffset={sideOffset}
          className={styles.content}
        >
          {text}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
)
