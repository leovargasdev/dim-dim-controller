import { useState } from 'react'
import { CaretDown, CaretUp, Pencil, Trash } from '@phosphor-icons/react'

import { SearchBar } from '../SearchBar'
import { IconSearchEmpty } from 'components/SVG'
import { Tooltip, ModalEditTransaction, ModalGenericAction } from 'components'

import { useTransactions } from 'hooks'
import { searchValueInArray } from 'utils/array'
import { categories } from 'data/transaction-categories'
import { formatDate, convertFloatToCurrency } from 'utils/format'
import type { Transaction, CategoryType, Category } from 'types/transaction'

import styles from './styles.module.scss'

interface Action {
  type: 'edit' | 'remove' | ''
  transaction: Transaction | null
}

export const ViewList = () => {
  const { transactions, handleRemoveTransaction } = useTransactions()

  const [loadingRemove, setLoadingRemove] = useState<boolean>(false)
  const [action, setAction] = useState<Action>({ type: '', transaction: null })
  const [search, onSearchTransactions] = useState<string>('')

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

  const categoriesIcons = categories.reduce((acc, category) => {
    return { ...acc, [category.value]: category }
  }, {} as Record<CategoryType, Category>)

  const transactionsFiltred: Transaction[] = searchValueInArray(
    transactions,
    'name',
    search
  )

  return (
    <>
      <ModalGenericAction
        open={!!action && action.type === 'remove'}
        onClose={onCloseAction}
        icon={<Trash size={64} />}
        description="Deseja remover essa transação?"
        buttonConfirm={{ loading: loadingRemove, action: onRemoveTransaction }}
      />

      <ModalEditTransaction
        onClose={onCloseAction}
        transaction={action.type === 'edit' ? action.transaction : null}
      />

      <div className={styles.container}>
        <SearchBar onSearch={onSearchTransactions} />

        {transactionsFiltred.length === 0 && (
          <section className={styles.empty}>
            <IconSearchEmpty />
            <span>
              A lista de transações está vazia! Altere o termo buscado ou faço o
              cadastro de uma transação
            </span>
          </section>
        )}

        <section className={'card ' + styles.list}>
          {transactionsFiltred.map(transaction => {
            const isRevenue = transaction.type === 'in'
            const category = categoriesIcons[transaction.category]
            const hasTags = !!transaction?.tags?.length
            const otherTags = hasTags ? transaction.tags?.slice(1) : []

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
                  <strong>{transaction.name}</strong>
                  <time dateTime={transaction.date as never}>
                    {formatDate(transaction.date, "dd 'de' MMM. (iii)")}
                  </time>
                </div>

                {hasTags && (
                  <div className={styles.item__tags}>
                    <span className={styles.item__tag}>
                      #{transaction.tags[0]}
                    </span>

                    {otherTags.length > 0 && (
                      <Tooltip
                        text={
                          <div>
                            {otherTags.map(tag => (
                              <p key={tag}>#{tag}</p>
                            ))}
                          </div>
                        }
                        sideOffset={12}
                      >
                        <span className={styles.item__tag}>
                          + {otherTags.length}
                        </span>
                      </Tooltip>
                    )}
                  </div>
                )}

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
