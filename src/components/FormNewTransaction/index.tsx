import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import api from 'services/api'
import { maskMoney } from 'utils/mask'
import CATEGORIES from 'data/categories'
import TYPE_TRANSACTIONS from 'data/type-transactions'
import { zodTransactionSchema, defaultValues } from 'utils/transaction'

import { CalendarPicker, Input, SelectCell } from 'components/Form'

import styles from './styles.module.scss'

export const FormNewTransaction = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const useFormMethods = useForm({
    mode: 'all',
    resolver: zodResolver(zodTransactionSchema),
    defaultValues
  })
  const onSubmit = async (data: any): Promise<void> => {
    setLoading(true)

    try {
      console.log(data)
      // await api.post('/transaction/create', data)
    } finally {
      useFormMethods.reset()
      setTimeout(() => setLoading(false), 3000)
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
                size="49%"
                label="Tipo de transação"
                options={TYPE_TRANSACTIONS}
              />

              <Input
                type="text"
                label="Valor"
                name="value"
                placeholder="R$ 0,00"
                maxLength={12}
                mask={maskMoney}
              />

              <Input
                type="text"
                name="name"
                label="Descrição"
                placeholder="Descrição"
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
