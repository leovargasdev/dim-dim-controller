import { useState } from 'react'
import { CaretDown, CaretUp, Pencil, Trash } from '@phosphor-icons/react'

import { useTransactions } from 'hooks'
import type { Transaction } from 'types/transaction'
import { Tooltip, ModalEditTransaction } from 'components'
import { formatDate, formatNumberToCurrency } from 'utils/format'

import styles from './styles.module.scss'

const TableHead = () => (
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
)

export const TransactionsList = () => {
  const { transactionsFiltred } = useTransactions()

  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null
  )

  return (
    <>
      <ModalEditTransaction
        transaction={editTransaction}
        onClose={() => setEditTransaction(null)}
      />

      <table className={styles.table}>
        <TableHead />

        <tbody>
          {transactionsFiltred.map(transaction => {
            const isRevenue = transaction.type === 'in'
            return (
              <tr key={transaction.id}>
                <td>
                  <Tooltip text={isRevenue ? 'Receita' : 'Despesa'}>
                    {/* eslint-disable-next-line prettier/prettier */}
                    {isRevenue ? <CaretUp size={16} weight="bold" fill="var(--green)" /> : <CaretDown size={16} weight="bold" fill="var(--red)" />}
                  </Tooltip>
                </td>
                <td>{formatDate(transaction.date, "dd 'de' MMM. (iii)")}</td>
                <td>{transaction.name}</td>
                <td>{formatNumberToCurrency(transaction.value)}</td>
                <td>{transaction.category}</td>
                <td className={styles.action}>
                  <Tooltip text="Editar transação">
                    <button
                      type="button"
                      data-type="edit"
                      onClick={() => setEditTransaction(transaction)}
                    >
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
            )
          })}
        </tbody>
      </table>
    </>
  )
}
