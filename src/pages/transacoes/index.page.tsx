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

  const transactionsCurrentMonth = transactions.filter(
    t => t.monthFilter === currentMonth
  )

  const resumeCategories = useMemo(() => {
    const sumCategories = transactionsCurrentMonth.reduce(
      (acc, transaction) => {
        const { value, category, type } = transaction

        if (type === 'in') return acc

        return {
          ...acc,
          [category]: !acc[category] ? value : acc[category] + value
        }
      },
      {} as Record<string, number>
    )

    return categoriesOut
      .map(category => ({
        name: category.name,
        color: category.color,
        value: sumCategories[category.value]
      }))
      .filter(category => category.value > 0)
  }, [transactionsCurrentMonth, categoriesOut])

  const currentMonthTotal = transactionsCurrentMonth.reduce(
    (acc, transaction) => {
      if (transaction.type === 'out') {
        return { in: acc.in, out: acc.out + transaction.value }
      }

      return { out: acc.out, in: acc.in + transaction.value }
    },
    { in: 0, out: 0 }
  )

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
          <ChartBar
            labels={['Despesas', 'Receitas']}
            datasets={[
              {
                data: [currentMonthTotal.out, currentMonthTotal.in],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                borderWidth: 1
              }
            ]}
          />
        </section>
      </div>
    </>
  )
}

export default TransactionsPage
