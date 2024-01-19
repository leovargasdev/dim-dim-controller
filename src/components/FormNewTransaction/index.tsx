import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { maskMoney } from 'utils/mask'
import CATEGORIES from 'data/categories'
import TYPE_TRANSACTIONS from 'data/type-transactions'
import type { FormTransaction } from 'types/transaction'
import { zodTransactionSchema, defaultValues } from 'utils/transaction'

import {
  Autocomplete,
  CalendarPicker,
  Input,
  SelectCell
} from 'components/Form'

import styles from './styles.module.scss'
import { useTransactions } from 'hooks/useTransactions'

export const FormNewTransaction = () => {
  const { transactions, addTransaction } = useTransactions()

  const [loading, setLoading] = useState<boolean>(false)
  const useFormMethods = useForm<FormTransaction>({
    mode: 'all',
    resolver: zodResolver(zodTransactionSchema),
    defaultValues
  })

  const onSubmit = async (data: FormTransaction): Promise<void> => {
    setLoading(true)
    await addTransaction(data)
    setLoading(false)
  }

  const onSelectAutocomplete = (transactionId: string): void => {
    const transaction = transactions.find(t => t.id === transactionId)

    if (transaction) {
      useFormMethods.setValue('category', transaction.category)
      useFormMethods.setValue('type', transaction.type)
    }
  }

  return (
    <FormProvider {...useFormMethods}>
      <form
        className={styles.container}
        onSubmit={useFormMethods.handleSubmit(onSubmit)}
      >
        <main className={styles.main}>
          <div className={styles.header}>
            <div className={styles.header__inputs}>
              <SelectCell
                name="type"
                label="Tipo de transação"
                options={TYPE_TRANSACTIONS}
              />

              <Input
                type="text"
                label="Valor"
                name="value"
                placeholder="R$ 0,00"
                maxLength={13}
                mask={maskMoney}
              />

              <Autocomplete
                type="text"
                name="name"
                label="Descrição"
                placeholder="Descrição"
                onSelected={onSelectAutocomplete}
                options={transactions.map(t => ({ name: t.name, value: t.id }))}
              />
            </div>

            <CalendarPicker name="date" />
          </div>

          <SelectCell name="category" options={CATEGORIES} label="Categorias" />
        </main>

        <button
          type="submit"
          disabled={loading}
          className={`button ${loading ? 'loading' : ''}`}
        >
          Cadastrar transação
        </button>
      </form>
    </FormProvider>
  )
}
