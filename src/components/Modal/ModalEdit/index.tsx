import { useEffect } from 'react'
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
import { Input, SelectCell } from 'components/Form'
import { zodTransactionSchema } from 'utils/transaction'

import styles from './styles.module.scss'
import TYPE_TRANSACTIONS from 'data/type-transactions'
import { useTransactions } from 'hooks'
import { addHours } from 'date-fns'

interface Props {
  transaction: Transaction | null
  onClose: () => void
}

export const ModalEditTransaction = ({ transaction, onClose }: Props) => {
  const { onEditTransaction } = useTransactions()
  const useFormMethods = useForm<Transaction>({
    mode: 'onSubmit',
    resolver: zodResolver(zodTransactionSchema)
  })

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
      await onEditTransaction({
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
            <SelectCell
              name="type"
              label="Tipo de transação"
              options={TYPE_TRANSACTIONS}
            />

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
            <Dialog.DialogClose className="button secondary">
              Cancelar
            </Dialog.DialogClose>
            <button
              type="submit"
              disabled={isLoading}
              className={`button ${isLoading ? 'loading' : ''}`}
            >
              Confirmar
            </button>
          </footer>
        </form>
      </FormProvider>
    </Modal>
  )
}
