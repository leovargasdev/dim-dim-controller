import Link from 'next/link'
import { BadgeDollarSign, LogOut } from 'lucide-react'
import styles from './styles.module.scss'

export const Header = () => (
  <header className={styles.header}>
    <strong>
      <BadgeDollarSign color="var(--green)" />
      FINANÇAS
    </strong>

    <nav className={styles.menu}>
      <Link href="/transacoes" className={styles.active}>
        Inicio
      </Link>
      <Link href="/nova-transacao">Nova transação</Link>
      <Link href="/nova-transacao">Relatorios</Link>
    </nav>

    <button type="button">
      <LogOut size={18} />
      SAIR
    </button>
  </header>
)
