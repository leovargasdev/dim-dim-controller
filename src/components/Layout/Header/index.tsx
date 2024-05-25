import Link from 'next/link'
import { useRouter } from 'next/router'
import { MoneyWavy, SignOut } from '@phosphor-icons/react'

import styles from './styles.module.scss'

const routes = [
  { path: '/transacoes', name: 'Início' },
  { path: '/cadastrar-transacao', name: 'Cadastrar transação' },
  { path: '/relario', name: 'Relatorios' }
]

export const Header = () => {
  const router = useRouter()
  const currentPath = router.asPath

  return (
    <header className={styles.header}>
      <strong>
        <MoneyWavy size={24} color="var(--green)" />
        FINANÇAS
      </strong>

      <nav className={styles.menu}>
        {routes.map(routeItem => (
          <Link
            key={routeItem.path}
            href={routeItem.path}
            className={currentPath === routeItem.path ? styles.active : ''}
          >
            {routeItem.name}
          </Link>
        ))}
      </nav>

      <button type="button">
        <SignOut size={18} weight="bold" />
        SAIR
      </button>
    </header>
  )
}
