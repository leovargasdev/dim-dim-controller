import { useMemo } from 'react'
import { differenceInCalendarDays } from 'date-fns'

import { ChartLine } from 'components'

import { useTransactions } from 'hooks'
import { convertFloatToCurrency, formatDate } from 'utils/format'

import styles from './styles.module.scss'

const today = new Date()
const currentMonth = formatDate(today, 'MMMM-yyyy')
const currenteDay = today.getDay() + 1
const daysInWeekly = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sabado'
]

export const TransactionsHeader = () => {
  const { transactions } = useTransactions()
  const transactionsOutInCurrentMonth = transactions.filter(
    t => t.type === 'out' && differenceInCalendarDays(today, t.date) <= 30
  )

  const resume = useMemo(() => {
    const data = transactionsOutInCurrentMonth.reduce(
      (acc, transaction) => {
        const { date, value } = transaction
        const { daily, weekly, monthly, lastSevenDays } = acc
        const distance = differenceInCalendarDays(today, date)
        const isMonth = transaction.monthFilter === currentMonth

        if (distance < 7) {
          lastSevenDays[distance] = lastSevenDays[distance] + value
        }

        return {
          daily: distance === 0 ? daily + value : daily,
          weekly: distance <= 7 ? weekly + value : weekly,
          monthly: isMonth ? monthly + value : monthly,
          lastSevenDays
        }
      },
      { daily: 0, weekly: 0, monthly: 0, lastSevenDays: [0, 0, 0, 0, 0, 0, 0] }
    )

    return data
  }, [transactionsOutInCurrentMonth])

  return (
    <section className={styles.container}>
      <h1>Transações por dia da semana</h1>
      <div className={styles.content}>
        <div className={'card ' + styles.chart}>
          <ChartLine
            values={resume.lastSevenDays.reverse()}
            labels={daysInWeekly
              .slice(currenteDay)
              .concat(daysInWeekly.slice(0, currenteDay))}
          />
        </div>

        <div className={styles.resume}>
          <div className="card">
            <p>Diário (hoje)</p>
            <strong>{convertFloatToCurrency(resume.daily)}</strong>
          </div>

          <div className="card">
            <p>Semanal (últimos 7 dias)</p>
            <strong>{convertFloatToCurrency(resume.weekly)}</strong>
          </div>

          <div className="card">
            <p>Mensal (mês atual)</p>
            <strong>{convertFloatToCurrency(resume.monthly)}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
