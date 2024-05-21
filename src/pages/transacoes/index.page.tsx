import { NextPage } from 'next'
import { useMemo } from 'react'
import { differenceInCalendarDays } from 'date-fns'

import { ViewList } from './components'
import { ChartDoughnut } from 'components'

import { useTransactions } from 'hooks'
import CATEGORIES from 'data/transaction-out-categories'
import { convertFloatToCurrency, formatDate } from 'utils/format'

import styles from './styles.module.scss'

const today = new Date('05-19-24')
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

  const resume = useMemo(() => {
    const data = transactionsOutInCurrentMonth.reduce(
      (acc, transaction) => {
        const { date, value } = transaction
        const { daily, weekly, monthly } = acc
        const distance = differenceInCalendarDays(today, date)

        return {
          daily: distance === 0 ? daily + value : daily,
          weekly: distance <= 7 ? weekly + value : weekly,
          monthly: distance <= 30 ? monthly + value : monthly
        }
      },
      { daily: 0, weekly: 0, monthly: 0 }
    )

    return data
  }, [transactionsOutInCurrentMonth])

  return (
    <div className={styles.container}>
      <ViewList />

      <section className={styles.resume}>
        <div className={styles.info}>
          <div>
            <p>Diário</p>
            <strong>{convertFloatToCurrency(resume.daily)}</strong>
          </div>

          <div>
            <p>Semanal</p>
            <strong>{convertFloatToCurrency(resume.weekly)}</strong>
          </div>

          <div>
            <p>Mensal</p>
            <strong>{convertFloatToCurrency(resume.monthly)}</strong>
          </div>
        </div>

        <ChartDoughnut items={resumeCategories} />
      </section>
    </div>
  )
}

export default TransactionsPage
