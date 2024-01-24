import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { maskMoney } from 'utils/mask'
import CATEGORIES_IN from 'data/transaction-in-categories'
import CATEGORIES_OUT from 'data/transaction-out-categories'
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
import { useRouter } from 'next/router'

export const FormNewTransaction = () => {
  const router = useRouter()
  const { transactions, addTransaction } = useTransactions()

  const useFormMethods = useForm<FormTransaction>({
    mode: 'all',
    resolver: zodResolver(zodTransactionSchema),
    defaultValues
  })

  const onSubmit = async (data: FormTransaction): Promise<void> => {
    const isSuccess = await addTransaction(data)

    // if (isSuccess) {
    // useFormMethods.reset()
    // router.push('/')
    // }
  }

  const onSelectAutocomplete = (transactionId: string): void => {
    const transaction = transactions.find(t => t.id === transactionId)

    if (transaction) {
      useFormMethods.setValue('category', transaction.category)
      useFormMethods.setValue('type', transaction.type)
    }
  }

  const type = useFormMethods.watch('type')
  const categories = type === 'in' ? CATEGORIES_IN : CATEGORIES_OUT

  useEffect(() => {
    const category = useFormMethods.getValues('category')
    const isOutCategory =
      CATEGORIES_OUT.findIndex(c => c.value === category) >= 0

    if (isOutCategory && type === 'in') {
      useFormMethods.setValue('category', 'salario')
    } else if (!isOutCategory && type === 'out') {
      useFormMethods.setValue('category', 'alimentacao')
    }
  }, [type])
  const isLoading = useFormMethods.formState.isSubmitting

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

          <SelectCell name="category" options={categories} label="Categorias" />
        </main>

        <button
          type="submit"
          disabled={isLoading}
          className={`button ${isLoading ? 'loading' : ''}`}
        >
          Cadastrar transação
        </button>
      </form>
    </FormProvider>
  )
}
