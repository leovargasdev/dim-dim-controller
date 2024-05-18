import Link from 'next/link'
import { BadgeDollarSign } from 'lucide-react'
import styles from './styles.module.scss'

export const Header = () => (
  <header className={styles.header}>
    <div>
      <strong>
        <BadgeDollarSign color="var(--green)" />
        FINANÇAS
      </strong>

      <span className={styles.separator} />

      <nav className={styles.menu}>
        <Link href="/transacoes">Inicio</Link>
        <Link href="/nova-transacao">Nova transação</Link>
        <Link href="/nova-transacao">Relatorios</Link>
      </nav>

      <button type="button">sair</button>
    </div>
  </header>
)
