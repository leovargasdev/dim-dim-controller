import { useState } from 'react'
import { X, Plus } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from 'components/Form'

import styles from './styles.module.scss'
import { zodTransactionSchema, defaultValues } from 'utils/transaction'

export const ModalNewTransaction = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const useFormMethods = useForm({
    mode: 'all',
    resolver: zodResolver(zodTransactionSchema),
    defaultValues
  })

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: any): Promise<void> => {
    setLoading(true)

    try {
      console.log(data)
    } finally {
      useFormMethods.reset()
      setLoading(false)
      setIsOpen(false)
    }
  }

  console.log(useFormMethods.formState.errors)

  return (
    <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <Dialog.Trigger className={'button '.concat(styles.button__trigger)}>
        <Plus weight="bold" />
        Adicionar transação
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.container}>
          <header className={styles.header}>
            <div>
              <Dialog.Title>Formulário da transação</Dialog.Title>
              <Dialog.Description>
                Preencha os campos para adicionar uma nova transação
              </Dialog.Description>
            </div>
            <Dialog.DialogClose>
              <X size={20} weight="bold" color="var(--primary)" />
            </Dialog.DialogClose>
          </header>

          <FormProvider {...useFormMethods}>
            <form>
              <main className={`${styles.main} scroll`}>
                <Input
                  type="text"
                  label="Nome"
                  name="name"
                  placeholder="Nome da operação"
                />

                <div className={styles.line}>
                  <Input
                    type="text"
                    label="Valor"
                    name="value"
                    placeholder="R$ 0,00"
                  />

                  <Input type="date" label="Data" name="date" placeholder="" />
                </div>
              </main>

              <footer className={styles.footer}>
                <Dialog.DialogClose className={'button ' + styles.cancel}>
                  Cancelar
                </Dialog.DialogClose>
                <button
                  type="button"
                  disabled={loading}
                  onClick={useFormMethods.handleSubmit(onSubmit)}
                  className={`button ${loading ? 'loading' : ''}`}
                >
                  Salvar
                </button>
              </footer>
            </form>
          </FormProvider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
