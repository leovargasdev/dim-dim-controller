import { useMemo } from 'react'
import { HandCoins, CreditCard, PiggyBank } from '@phosphor-icons/react'

import { ChartDoughnut, ChartLine } from 'components'
import { useTransactions } from 'hooks/useTransactions'
import CATEGORIES from 'data/transaction-out-categories'
import { formatDate, convertFloatToCurrency } from 'utils/format'

import styles from './styles.module.scss'

const currentMonth = formatDate(new Date(), 'MMMM-yyyy')

export const TransactionsResume = () => {
  const { transactions } = useTransactions()
  const data = transactions.filter(t => t.monthFilter === currentMonth)

  const resume = useMemo(() => {
    return data.reduce(
      (acc, transaction) => {
        if (transaction.type === 'in') {
          return { ...acc, in: acc.in + transaction.value }
        }
        return { ...acc, out: acc.out + transaction.value }
      },
      { in: 0, out: 0 }
    )
  }, [data])

  const resumeCategories = useMemo(() => {
    const sumCategories = data.reduce(
      (acc: Record<string, number>, transaction) => {
        const { value, category } = transaction

        return {
          ...acc,
          [category]: !acc[category] ? value : acc[category] + value
        }
      },
      {}
    )

    return CATEGORIES.map(category => ({
      name: category.name,
      color: category.color,
      value: sumCategories[category.value]
    })).filter(category => category.value > 0)
  }, [data, CATEGORIES])

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
