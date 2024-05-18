import { useTransactions } from 'hooks/useTransactions'
import { formatDate, convertFloatToCurrency } from 'utils/format'
import { HandCoins, CreditCard, PiggyBank } from '@phosphor-icons/react'

import styles from './styles.module.scss'

const currentMonth = formatDate(new Date(), 'MMMM-yyyy')

export const TransactionsResume = () => {
  const { transactions } = useTransactions()

  const resume = transactions.reduce(
    (acc, transaction) => {
      if (transaction.monthFilter === currentMonth) {
        if (transaction.type === 'in') {
          return { ...acc, in: acc.in + transaction.value }
        }

        return { ...acc, out: acc.out + transaction.value }
      }
      return acc
    },
    { in: 0, out: 0 }
  )

  return (
    <section className={styles.container}>
      <article>
        <div className={styles.label}>
          <h2>Receita total(mês)</h2>
          <HandCoins size={32} />
        </div>

        <strong>{convertFloatToCurrency(resume.in)}</strong>
      </article>

      <article>
        <div className={styles.label}>
          <h2>Despesa total(mês)</h2>
          <CreditCard size={32} />
        </div>

        <strong>{convertFloatToCurrency(resume.out)}</strong>
      </article>

      <article>
        <div className={styles.label}>
          <h2>Saldo (mês)</h2>
          <PiggyBank size={32} />
        </div>

        <strong>{convertFloatToCurrency(resume.in - resume.out)}</strong>
      </article>
    </section>
  )
}
