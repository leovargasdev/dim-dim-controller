import { Logo } from 'components/SVG'

import styles from './styles.module.scss'

export const Header = () => (
  <header className={styles.header}>
    <Logo />

    <button type="button">Nova Transação</button>
  </header>
)
