import { useMemo } from 'react'
import { NextPage } from 'next'

import { useTransactions } from 'hooks'
import { formatDate } from 'utils/format'
import { categoriesOut } from 'data/transaction-categories'

import { ChartBar, ChartDoughnut } from 'components'
import { ViewList, TransactionsHeader } from './components'

import styles from './styles.module.scss'

const today = new Date()
const currentMonth = formatDate(today, 'MMMM-yyyy')

const TransactionsPage: NextPage = () => {
  const { transactions } = useTransactions()
  const transactionsOutInCurrentMonth = transactions.filter(
    t => t.monthFilter === currentMonth && t.type === 'out'
  )

  const resumeCategories = useMemo(() => {
    const sumCategories = transactionsOutInCurrentMonth.reduce(
      (acc: Record<string, number>, transaction) => {
        const { value, category } = transaction

        return {
          ...acc,
          [category]: !acc[category] ? value : acc[category] + value
        }
      },
      {}
    )

    return categoriesOut
      .map(category => ({
        name: category.name,
        color: category.color,
        value: sumCategories[category.value]
      }))
      .filter(category => category.value > 0)
  }, [transactionsOutInCurrentMonth, categoriesOut])

  return (
    <>
      <TransactionsHeader />

      <div className={styles.list_and_doughnut}>
        <ViewList />

        <section className={'card ' + styles.doughnut}>
          <strong>Gastos por categoria no mês atual</strong>

          <span>
            <ChartDoughnut items={resumeCategories} />
          </span>
        </section>

        <section className={'card ' + styles.bar}>
          <strong>Despesas vs Gastos (mês atual)</strong>
          <ChartBar />
        </section>
      </div>
    </>
  )
}

export default TransactionsPage
