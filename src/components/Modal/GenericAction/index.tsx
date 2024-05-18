import { ModalSimple, ModalSimpleProps } from 'components'

import styles from './styles.module.scss'

interface Props extends Omit<ModalSimpleProps, 'children'> {
  icon: React.ReactNode
  description: string
  onClose: () => void
  buttonConfirm: {
    loading: boolean
    action: () => void
  }
}

export const ModalGenericAction = ({
  onClose,
  buttonConfirm,
  icon,
  description,
  ...rest
}: Props) => (
  <ModalSimple onOpenChange={onClose} {...rest}>
    <div className={styles.container}>
      {icon}

      <p>{description}</p>

      <div className={styles.footer}>
        <button
          className="button"
          type="button"
          onClick={onClose}
          disabled={buttonConfirm.loading}
        >
          cancelar
        </button>
        <button
          type="button"
          className="button"
          onClick={buttonConfirm.action}
          disabled={buttonConfirm.loading}
          data-state={buttonConfirm.loading ? 'loading' : 'read'}
        >
          confirmar
        </button>
      </div>
    </div>
  </ModalSimple>
)
