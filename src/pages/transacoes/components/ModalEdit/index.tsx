import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { Input, SelectCell } from 'components/Form'
import { formatDate } from 'utils/format'
import styles from './styles.module.scss'
import { Transaction } from 'types/transaction'
import { zodTransactionSchema } from 'utils/transaction'
import { maskMoney } from 'utils/mask'
import TYPE_TRANSACTIONS from 'data/type-transactions'

interface Props {
  transaction: Transaction
  onClose: () => void
}

export const ModalEditTransaction = ({ transaction, onClose }: Props) => {
  const useFormMethods = useForm<Transaction>({
    mode: 'onSubmit',
    resolver: zodResolver(zodTransactionSchema),
    defaultValues: {
      ...transaction,
      date: formatDate(transaction.date, 'yyyy-MM-dd') as never
    }
  })

  const onSubmit = async (data: Transaction): Promise<void> => {
    console.log(data)
    // await handleEditGoal({ ...data, date: addHours(new Date(data.date), 5) })
  }

  const isLoading = useFormMethods.formState.isSubmitting

  return (
    <Dialog.Root onOpenChange={onClose} open={transaction !== null}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.container}>
          <header className={styles.header}>
            <div>
              <Dialog.Title>Editar transação</Dialog.Title>
              <Dialog.Description>
                Edite os campos para atualizar a transação
              </Dialog.Description>
            </div>
            <Dialog.DialogClose>
              <X size={20} weight="bold" color="var(--secondary)" />
            </Dialog.DialogClose>
          </header>

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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
