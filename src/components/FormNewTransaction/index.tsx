import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import api from 'services/api'
import { maskMoney } from 'utils/mask'

import { Input } from 'components/Form'
import { SelectType } from './components/SelectType'
import { SelectCategory } from './components/SelectCategory'
import { zodTransactionSchema, defaultValues } from 'utils/transaction'

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
      await api.post('/transaction/create', data)
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
          <SelectType />

          <div className={styles.line}>
            <Input
              type="text"
              name="name"
              label="Descrição"
              placeholder="Descrição"
            />

            <Input
              type="text"
              label="Valor"
              name="value"
              placeholder="R$ 0,00"
              maxLength={12}
              mask={maskMoney}
            />

            <Input type="date" label="Data" name="date" placeholder="" />
          </div>

          <SelectCategory />
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
