import { useState } from 'react'
import { CaretDown, CaretUp, Pencil, Trash } from '@phosphor-icons/react'

import { useTransactions } from 'hooks'
import type { Transaction } from 'types/transaction'
import { formatDate, formatNumberToCurrency } from 'utils/format'
import { Tooltip, ModalEditTransaction, ModalGenericAction } from 'components'

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

interface Action {
  type: 'edit' | 'remove' | ''
  transaction: Transaction | null
}

export const TransactionsList = () => {
  const { transactionsFiltred, handleRemoveTransaction } = useTransactions()

  const [loadingRemove, setLoadingRemove] = useState<boolean>(false)
  const [action, setAction] = useState<Action>({ type: '', transaction: null })

  const onCloseAction = () => {
    setAction({ type: '', transaction: null })
  }

  const onRemoveTransaction = async () => {
    if (action.transaction) {
      setLoadingRemove(true)
      await handleRemoveTransaction(action.transaction.id)
      setLoadingRemove(false)
      onCloseAction()
    }
  }

  return (
    <>
      <ModalGenericAction
        open={!!action && action.type === 'remove'}
        onClose={onCloseAction}
        description="Deseja remover essa transação?"
        icon={<Trash size={64} />}
        buttonConfirm={{ loading: loadingRemove, action: onRemoveTransaction }}
      />

      <ModalEditTransaction
        onClose={onCloseAction}
        transaction={action.type === 'edit' ? action.transaction : null}
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
                      onClick={() => setAction({ type: 'edit', transaction })}
                    >
                      <Pencil size={14} fill="var(--secondary)" />
                    </button>
                  </Tooltip>
                </td>
                <td className={styles.action}>
                  <Tooltip text="Remover transação">
                    <button
                      type="button"
                      data-type="remove"
                      onClick={() => setAction({ type: 'remove', transaction })}
                    >
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
