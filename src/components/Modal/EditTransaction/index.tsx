import { useEffect } from 'react'
import { addHours } from 'date-fns'
import { useTransactions } from 'hooks'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { Modal } from 'components'
import { maskMoney } from 'utils/mask'
import {
  convertCurrencyToFloat,
  convertFloatToCurrency,
  formatDate
} from 'utils/format'
import { Transaction } from 'types/transaction'
import { Input, Select } from 'components/Form'
import { zodTransactionSchema } from 'utils/transaction'

import styles from './styles.module.scss'
import TYPE_TRANSACTIONS from 'data/type-transactions'
import CATEGORIES_IN from 'data/transaction-in-categories'
import CATEGORIES_OUT from 'data/transaction-out-categories'

interface Props {
  transaction: Transaction | null
  onClose: () => void
}

export const ModalEditTransaction = ({ transaction, onClose }: Props) => {
  const { handleEditTransaction } = useTransactions()
  const useFormMethods = useForm<Transaction>({
    mode: 'onSubmit',
    resolver: zodResolver(zodTransactionSchema)
  })

  const type = useFormMethods.watch('type')

  useEffect(() => {
    if (transaction) {
      useFormMethods.reset({
        ...transaction,
        value: convertFloatToCurrency(transaction.value) as never,
        date: formatDate(transaction.date, 'yyyy-MM-dd') as never
      })
    }
  }, [transaction])

  const onSubmit = async (data: any): Promise<void> => {
    if (transaction) {
      await handleEditTransaction({
        ...data,
        id: transaction.id,
        value: convertCurrencyToFloat(data.value),
        date: addHours(new Date(data.date), 3)
      })
      onClose()
    }
  }

  const isLoading = useFormMethods.formState.isSubmitting

  return (
    <Modal
      onOpenChange={onClose}
      open={transaction !== null}
      title="Editar transação"
      description="Edite os campos para atualizar a transação"
    >
      <FormProvider {...useFormMethods}>
        <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          <main className={`${styles.main} scroll`}>
            <div className={styles.row}>
              <Select
                name="type"
                label="Tipo de transação"
                options={TYPE_TRANSACTIONS}
              />
              {/* TODO */}
              {/* monitorar o type para resetar o campo */}
              <Select
                name="category"
                label="Categoria"
                options={type === 'in' ? CATEGORIES_IN : CATEGORIES_OUT}
              />
            </div>

            <Input
              type="text"
              label="Descrição"
              name="name"
              placeholder="Descrição da transação"
            />

            <div className={styles.row}>
              <Input
                type="text"
                label="Valor"
                name="value"
                maxLength={13}
                placeholder="R$ 0,00"
                mask={maskMoney}
              />

              <Input type="date" label="Data" name="date" />
            </div>
          </main>

          <footer className={styles.footer}>
            <Dialog.DialogClose
              disabled={isLoading}
              className="button secondary"
            >
              Cancelar
            </Dialog.DialogClose>
            <button
              type="submit"
              className="button"
              disabled={isLoading}
              data-state={isLoading ? 'loading' : 'read'}
            >
              Confirmar
            </button>
          </footer>
        </form>
      </FormProvider>
    </Modal>
  )
}
