import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  CaretDown,
  CaretUp,
  MagnifyingGlass,
  Pencil,
  Trash,
  X
} from '@phosphor-icons/react'

import { useTransactions } from 'hooks'
import { categories } from 'data/transaction-categories'
import { formatDate, convertFloatToCurrency } from 'utils/format'
import type { Transaction, CategoryType, Category } from 'types/transaction'
import { Tooltip, ModalEditTransaction, ModalGenericAction } from 'components'

import styles from './styles.module.scss'

interface Action {
  type: 'edit' | 'remove' | ''
  transaction: Transaction | null
}

export const ViewList = () => {
  const { transactions: defaultData, handleRemoveTransaction } =
    useTransactions()
  const [textSearch, setTextSearch] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const [transactions, setTransactions] = useState<Transaction[]>([])

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

  const onSearchTransactions = (value: string) => {
    setTransactions(defaultData.filter(({ name }) => name.includes(value)))
  }

  const onChangeTextSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart()
    setTextSearch(value)

    timeoutId && clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => onSearchTransactions(value), 500))
  }

  const onClearTextSearch = () => {
    setTextSearch('')
    onSearchTransactions('')
  }

  useEffect(() => {
    onSearchTransactions(textSearch)
  }, [defaultData])

  const categoriesIcons = categories.reduce((acc, category) => {
    return { ...acc, [category.value]: category }
  }, {} as Record<CategoryType, Category>)

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

      <div className={styles.container}>
        <div className={styles.search}>
          <MagnifyingGlass />
          <input
            type="text"
            value={textSearch}
            onChange={onChangeTextSearch}
            placeholder="Pesquise pelo nome da transação"
          />
          <button
            type="button"
            onClick={onClearTextSearch}
            data-state={textSearch === '' ? 'hidden' : 'read'}
          >
            <X />
          </button>
        </div>

        <section className={'card ' + styles.list}>
          {transactions.map(transaction => {
            const isRevenue = transaction.type === 'in'
            const category = categoriesIcons[transaction.category]

            return (
              <div key={transaction.id} className={styles.item}>
                <span className={styles.item__type}>
                  <Tooltip text={isRevenue ? 'Receita' : 'Despesa'}>
                    {/* eslint-disable-next-line prettier/prettier */}
                  {isRevenue ? <CaretUp size={16} weight="bold" fill="var(--green)" /> : <CaretDown size={16} weight="bold" fill="var(--red)" />}
                  </Tooltip>
                </span>

                <span className={styles.item__icon}>
                  <Tooltip text={category.name} sideOffset={12}>
                    {category.icon}
                  </Tooltip>
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
      </div>
    </>
  )
}
