import { WarningCircle } from '@phosphor-icons/react'

import styles from './styles.module.scss'

interface ErrorMessageProps {
  message: string | undefined
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) {
    return <></>
  }

  return (
    <span role="alert" className={styles.error}>
      <WarningCircle size={14} weight="bold" color="var(--error)" />
      {message}
    </span>
  )
}
