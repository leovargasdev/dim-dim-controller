import { HandCoins, CreditCard, PiggyBank } from '@phosphor-icons/react'

import styles from './styles.module.scss'
import { useTransactions } from 'hooks/useTransactions'
import { formatNumberToCurrency } from 'utils/format'

export const TransactionsResume = () => {
  const { transactions } = useTransactions()

  const resume = transactions.reduce(
    (acc, trans) => {
      if (trans.type === 'in') {
        return { out: acc.out, in: acc.in + trans.value }
      }

      return { in: acc.in, out: acc.out + trans.value }
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
        <div>
          <strong>{formatNumberToCurrency(resume.in)}</strong>
          <p>
            <span>+4%</span> em relação ao mês passado
          </p>
        </div>
      </article>

      <article>
        <div className={styles.label}>
          <h2>Despesa total(mês)</h2>
          <CreditCard size={32} />
        </div>
        <div>
          <strong>{formatNumberToCurrency(resume.out)}</strong>
          <p>
            <span>+4%</span> em relação ao mês passado
          </p>
        </div>
      </article>

      <article>
        <div className={styles.label}>
          <h2>Saldo (mês)</h2>
          <PiggyBank size={32} />
        </div>
        <div>
          <strong>{formatNumberToCurrency(resume.in - resume.out)}</strong>
          <p>
            <span>+4%</span> em relação ao mês passado
          </p>
        </div>
      </article>
    </section>
  )
}
