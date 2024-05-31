import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { maskMoney } from 'utils/mask'
import { useTransactions } from 'hooks'
import { convertFloatToCurrency } from 'utils/format'
import type { FormTransaction, CategoryType } from 'types/transaction'
import { zodTransactionSchema, defaultValues } from 'utils/transaction'
import {
  Autocomplete,
  CalendarPicker,
  Input,
  SelectCell,
  InputTags
} from 'components/Form'

import TRANSACTION_TYPES from 'data/transaction-types'
import { categoriesIn, categoriesOut } from 'data/transaction-categories'

import styles from './styles.module.scss'

const NewTransactionPage = () => {
  const { transactions, addTransaction } = useTransactions()

  const useFormMethods = useForm<FormTransaction>({
    mode: 'all',
    resolver: zodResolver(zodTransactionSchema),
    defaultValues
  })

  const type = useFormMethods.watch('type')
  const categories = type === 'in' ? categoriesIn : categoriesOut

  const onSubmit = async (data: FormTransaction): Promise<void> => {
    await addTransaction(data)

    useFormMethods.setValue('name', '')
    useFormMethods.setValue('value', '')
    useFormMethods.setValue('tags', [])
  }

  const onChangeCategory = (newCategory: CategoryType) => {
    setTimeout(() => useFormMethods.setValue('category', newCategory), 200)
  }

  const onSelectAutocomplete = (id: string): void => {
    const transaction = transactions.find(trans => trans.id === id)

    if (transaction) {
      const value = convertFloatToCurrency(transaction.value)
      useFormMethods.setValue('value', value)
      useFormMethods.setValue('type', transaction.type)
      onChangeCategory(transaction.category)
    }
  }

  const onChangeType = (newType: string) => {
    const category = newType === 'out' ? 'alimentacao' : 'salario'
    onChangeCategory(category)
  }

  const isLoading = useFormMethods.formState.isSubmitting

  return (
    <section className={styles.container}>
      <h1>Cadastrar transação</h1>
      <FormProvider {...useFormMethods}>
        <form className="card" style={{ padding: 32 }}>
          <div className={styles.main}>
            <div className={styles.inputs_and_calendar}>
              <div className={styles.inputs}>
                <Autocomplete
                  type="text"
                  name="name"
                  label="Nome"
                  placeholder="Ex: compras no supermercado xxx"
                  onSelected={onSelectAutocomplete}
                  options={transactions.map(t => ({
                    name: t.name,
                    value: t.id
                  }))}
                />

                <SelectCell
                  name="type"
                  label="Tipo de transação"
                  options={TRANSACTION_TYPES}
                  externalEvent={onChangeType}
                />

                <Input
                  type="text"
                  label="Valor"
                  name="value"
                  placeholder="R$ 0,00"
                  maxLength={13}
                  mask={maskMoney}
                />
              </div>

              <CalendarPicker name="date" />
            </div>

            <SelectCell
              name="category"
              options={categories}
              label="Categorias"
            />

            <InputTags />
          </div>

          <button
            type="button"
            className="button"
            disabled={isLoading}
            data-state={isLoading ? 'loading' : 'read'}
            onClick={useFormMethods.handleSubmit(onSubmit)}
          >
            Cadastrar transação
          </button>
        </form>
      </FormProvider>
    </section>
  )
}

export default NewTransactionPage
