import { useState } from 'react'
import {
  CaretDown,
  CaretUp,
  GameController,
  Pencil,
  Trash
} from '@phosphor-icons/react'

import { useTransactions } from 'hooks'
import type { Transaction } from 'types/transaction'
import { formatDate, convertFloatToCurrency } from 'utils/format'
import { Tooltip, ModalEditTransaction, ModalGenericAction } from 'components'

import styles from './styles.module.scss'

interface Action {
  type: 'edit' | 'remove' | ''
  transaction: Transaction | null
}

export const ViewList = () => {
  const { transactions, handleRemoveTransaction } = useTransactions()

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

      <section className={'card ' + styles.container}>
        {transactions.map(transaction => {
          const isRevenue = transaction.type === 'in'

          return (
            <div key={transaction.id} className={styles.item}>
              <span className={styles.item__type}>
                <Tooltip text={isRevenue ? 'Receita' : 'Despesa'}>
                  {/* eslint-disable-next-line prettier/prettier */}
                  {isRevenue ? <CaretUp size={16} weight="bold" fill="var(--green)" /> : <CaretDown size={16} weight="bold" fill="var(--red)" />}
                </Tooltip>
              </span>

              <span className={styles.item__icon}>
                <GameController size={18} weight="regular" />
              </span>

              <div className={styles.item__info}>
                {/* <strong>{self.crypto.randomUUID()}</strong> */}
                <strong>{transaction.name}</strong>
                <time dateTime={transaction.date as never}>
                  {formatDate(transaction.date, "dd 'de' MMM. (iii)")}
                </time>
              </div>

              <span className={styles.item__value}>
                {convertFloatToCurrency(transaction.value)}
              </span>

              <div className={styles.item__actions}>
                <Tooltip text="Editar transação">
                  <button
                    type="button"
                    data-type="edit"
                    onClick={() => setAction({ type: 'edit', transaction })}
                  >
                    <Pencil size={14} fill="var(--secondary)" />
                  </button>
                </Tooltip>

                <Tooltip text="Remover transação">
                  <button
                    type="button"
                    data-type="remove"
                    onClick={() => setAction({ type: 'remove', transaction })}
                  >
                    <Trash size={16} fill="var(--secondary)" />
                  </button>
                </Tooltip>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}
