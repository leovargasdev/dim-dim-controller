import { CaretDown, CaretUp, Pencil, Trash } from '@phosphor-icons/react'

import { Tooltip } from 'components'
import { TransactionType } from 'types/transaction'
import { useTransactions } from 'hooks/useTransactions'
import { formatDate, formatNumberToCurrency } from 'utils/format'

import styles from './styles.module.scss'

export const TransactionsList = () => {
  const { transactionsFiltred } = useTransactions()

  const tdTypeTransaction = (type: TransactionType) => {
    if (type === 'in') {
      return (
        <td>
          <Tooltip text="Receita">
            <CaretUp size={16} weight="bold" fill="var(--green)" />
          </Tooltip>
        </td>
      )
    }

    return (
      <td>
        <Tooltip text="Despesa">
          <CaretDown size={16} weight="bold" fill="var(--red)" />
        </Tooltip>
      </td>
    )
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th />
          <th>Data</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th />
          <th />
        </tr>
      </thead>

      <tbody>
        {transactionsFiltred.map(transaction => (
          <tr key={transaction.id}>
            {tdTypeTransaction(transaction.type)}
            <td>{formatDate(transaction.date, "dd 'de' MMM. (iii)")}</td>
            <td>{transaction.name}</td>
            <td>{formatNumberToCurrency(transaction.value)}</td>
            <td>{transaction.category}</td>
            <td className={styles.action}>
              <Tooltip text="Editar transação">
                <button type="button" data-type="edit">
                  <Pencil size={14} fill="var(--secondary)" />
                </button>
              </Tooltip>
            </td>
            <td className={styles.action}>
              <Tooltip text="Remover transação">
                <button type="button" data-type="remove">
                  <Trash size={16} fill="var(--secondary)" />
                </button>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
