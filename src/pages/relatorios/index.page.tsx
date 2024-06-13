import { ChartBar } from 'components'
import { compareAsc, startOfMonth, subMonths } from 'date-fns'
import { useTransactions } from 'hooks'
import { useMemo } from 'react'

import styles from './styles.module.scss'

const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
]

const today = new Date()
const currentMonth = today.getMonth()
const firstDayInLastMonth = startOfMonth(subMonths(today, 5))

const ReportsPage = () => {
  const { transactions } = useTransactions()

  const labels = useMemo(() => {
    const data = months.slice(0, currentMonth + 1).reverse()
    if (data.length >= 6) {
      return data.slice(0, 6)
    }

    const faltantes = data.length - 6

    return data.concat(months.slice(faltantes).reverse())
  }, [months, currentMonth])

  const totalByMonths = useMemo(() => {
    const data = transactions.filter(
      t => compareAsc(firstDayInLastMonth, t.date) <= 0
    )

    return data.reduce(
      (acc, transaction) => {
        const { type, value, monthFilter } = transaction
        const key = monthFilter.split('-')[0]

        if (type === 'in') {
          const total = acc.in[key] ? acc.in[key] + value : value
          return { out: acc.out, in: { ...acc.in, [key]: total } }
        }

        const total = acc.out[key] ? acc.out[key] + value : value
        return { in: acc.in, out: { ...acc.out, [key]: total } }
      },
      { in: {} as Record<string, number>, out: {} as Record<string, number> }
    )
  }, [transactions, labels])

  // console.table(
  //   transactions.filter(
  //     t => t.type === 'out' && t.monthFilter === 'janeiro-2024'
  //   )
  // )

  return (
    <>
      <section className={styles.container}>
        <h1>Despesas VS Gastos (últimos 6 meses)</h1>
        <div className={'card ' + styles.chart}>
          <ChartBar
            labels={labels}
            datasets={[
              {
                data: labels.map(label => totalByMonths.out[label] || 10),
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
              },
              {
                data: labels.map(label => totalByMonths.in[label] || 10),
                backgroundColor: 'rgba(53, 162, 235, 0.4)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
              }
            ]}
          />
        </div>
      </section>
    </>
  )
}

export default ReportsPage
