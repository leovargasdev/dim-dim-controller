import { NextPage } from 'next'

import { ViewList } from './components'
import { ChartDoughnut } from 'components'
import { Header } from './components/Header'

import styles from './styles.module.scss'
import { useTransactions } from 'hooks'
import { useMemo } from 'react'
import CATEGORIES from 'data/transaction-out-categories'
import { formatDate } from 'utils/format'

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

    return CATEGORIES.map(category => ({
      name: category.name,
      color: category.color,
      value: sumCategories[category.value]
    })).filter(category => category.value > 0)
  }, [transactionsOutInCurrentMonth, CATEGORIES])

  return (
    <>
      <Header />

      <div className={styles.list_and_doughnut}>
        <ViewList />

        <section className={'card ' + styles.doughnut}>
          <span>
            <ChartDoughnut items={resumeCategories} />
          </span>
        </section>
      </div>
    </>
  )
}

export default TransactionsPage
