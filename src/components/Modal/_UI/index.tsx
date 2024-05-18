import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'

import styles from './styles.module.scss'

export interface ModalProps extends Dialog.DialogProps {
  title: string
  description: string
  children: React.ReactNode
}

export const Modal = ({
  title,
  description,
  children,
  ...rest
}: ModalProps) => (
  <Dialog.Root {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.container}>
        <header className={styles.header}>
          <div>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </div>

          <Dialog.DialogClose>
            <X size={20} weight="bold" color="var(--secondary)" />
          </Dialog.DialogClose>
        </header>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export interface ModalSimpleProps extends Dialog.DialogProps {
  children: React.ReactNode
}

export const ModalSimple = ({ children, ...rest }: ModalSimpleProps) => (
  <Dialog.Root {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.container} data-size="small">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
