import { useMemo } from 'react'
import { NextPage } from 'next'

import { useTransactions } from 'hooks'
import { formatDate } from 'utils/format'
import CATEGORIES from 'data/transaction-out-categories'

import { ChartDoughnut } from 'components'
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

    return CATEGORIES.map(category => ({
      name: category.name,
      color: category.color,
      value: sumCategories[category.value]
    })).filter(category => category.value > 0)
  }, [transactionsOutInCurrentMonth, CATEGORIES])

  return (
    <>
      <TransactionsHeader />

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
