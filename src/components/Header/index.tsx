import { ModalNewTransaction } from 'components/Modal'
import { Logo } from 'components/SVG'

import styles from './styles.module.scss'

export const Header = () => (
  <header className={styles.header}>
    <Logo />

    <ModalNewTransaction />
  </header>
)
