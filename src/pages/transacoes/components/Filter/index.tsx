import { useMemo } from 'react'
import { useTransactions } from 'hooks/useTransactions'

import styles from './styles.module.scss'

export const TransactionsFilter = () => {
  const { transactions, setMonthFilter, monthFilter } = useTransactions()

  const options: string[] = useMemo(() => {
    if (transactions.length === 0) {
      return []
    }

    const months = new Set()
    transactions.map(trans => months.add(trans.monthFilter))

    const result = Array.from(months) as string[]
    !monthFilter && setMonthFilter(result[0])

    return result
  }, [transactions])

  return (
    <div className={styles.container}>
      {options.map(option => {
        const [month, year] = option.split('-')
        const className = monthFilter === option ? styles.active : ''

        return (
          <button
            type="button"
            key={option}
            className={className}
            onClick={() => setMonthFilter(option)}
          >
            {month} ({year})
          </button>
        )
      })}
    </div>
  )
}
