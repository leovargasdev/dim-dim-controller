import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { maskMoney } from 'utils/mask'
import { useTransactions } from 'hooks'
import type { FormTransaction } from 'types/transaction'
import { zodTransactionSchema, defaultValues } from 'utils/transaction'
import {
  Autocomplete,
  CalendarPicker,
  Input,
  Select,
  SelectCell
} from 'components/Form'

import TYPE_TRANSACTIONS from 'data/type-transactions'
import CATEGORIES_IN from 'data/transaction-in-categories'
import CATEGORIES_OUT from 'data/transaction-out-categories'

import styles from './styles.module.scss'

const NewTransactionPage = () => {
  const { transactions, addTransaction } = useTransactions()

  const useFormMethods = useForm<FormTransaction>({
    mode: 'all',
    resolver: zodResolver(zodTransactionSchema),
    defaultValues
  })

  const onSubmit = async (data: FormTransaction): Promise<void> => {
    await addTransaction(data)
    useFormMethods.reset()
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
              <div className={styles.row}>
                <Select />

                <Input
                  type="text"
                  label="Valor"
                  name="value"
                  placeholder="R$ 0,00"
                  maxLength={13}
                  mask={maskMoney}
                />
              </div>

              <Autocomplete
                type="text"
                name="name"
                label="Descrição"
                placeholder="Descrição"
                onSelected={onSelectAutocomplete}
                options={transactions.map(t => ({ name: t.name, value: t.id }))}
              />
            </div>

            {/* <CalendarPicker name="date" /> */}
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

export default NewTransactionPage
