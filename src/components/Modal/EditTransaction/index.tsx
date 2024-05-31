import { useEffect } from 'react'
import { addHours } from 'date-fns'
import { useTransactions } from 'hooks'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { Modal } from 'components'
import { Input, InputTags, Select } from 'components/Form'

import {
  convertCurrencyToFloat,
  convertFloatToCurrency,
  formatDate
} from 'utils/format'
import { maskMoney } from 'utils/mask'
import TRANSACTION_TYPE from 'data/transaction-types'
import { zodTransactionSchema } from 'utils/transaction'
import type { Transaction, FormTransaction } from 'types/transaction'
import { categoriesIn, categoriesOut } from 'data/transaction-categories'

import styles from './styles.module.scss'

interface Props {
  transaction: Transaction | null
  onClose: () => void
}

export const ModalEditTransaction = ({ transaction, onClose }: Props) => {
  const { handleEditTransaction } = useTransactions()
  const useFormMethods = useForm<FormTransaction>({
    mode: 'onSubmit',
    resolver: zodResolver(zodTransactionSchema)
  })

  const type = useFormMethods.watch('type')

  useEffect(() => {
    if (transaction) {
      useFormMethods.reset({
        ...transaction,
        value: convertFloatToCurrency(transaction.value) as never,
        date: formatDate(transaction.date, 'yyyy-MM-dd') as never,
        tags: transaction.tags.map((name, index) => ({
          name,
          id: index + name
        }))
      })
    }
  }, [transaction])

  const onSubmit = async (data: FormTransaction): Promise<void> => {
    if (transaction) {
      const payload = {
        ...data,
        id: transaction.id,
        value: convertCurrencyToFloat(data.value),
        date: addHours(new Date(data.date), 3),
        tags: data.tags.map(tag => tag.name)
      } as Transaction

      await handleEditTransaction(payload)
      onClose()
    }
  }

  const isLoading = useFormMethods.formState.isSubmitting

  return (
    <Modal
      onOpenChange={onClose}
      open={transaction !== null}
      title="Editar transação"
      description="Altere os campos para atualizar a transação"
    >
      <FormProvider {...useFormMethods}>
        <form>
          <main className={`${styles.main} scroll`}>
            <div className={styles.row}>
              <Select
                name="type"
                label="Tipo de transação"
                options={TRANSACTION_TYPE}
              />
              {/* TODO */}
              {/* monitorar o type para resetar o campo */}
              <Select
                name="category"
                label="Categoria"
                options={type === 'in' ? categoriesIn : categoriesOut}
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

            <InputTags />
          </main>

          <footer className={styles.footer}>
            <Dialog.DialogClose
              disabled={isLoading}
              className="button secondary"
            >
              Cancelar
            </Dialog.DialogClose>
            <button
              type="button"
              className="button"
              disabled={isLoading}
              data-state={isLoading ? 'loading' : 'read'}
              onClick={useFormMethods.handleSubmit(onSubmit)}
            >
              Confirmar
            </button>
          </footer>
        </form>
      </FormProvider>
    </Modal>
  )
}
