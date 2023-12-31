import { useState } from 'react'
import { X, Plus } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import api from 'services/api'
import { maskMoney } from 'utils/mask'

import { Input } from 'components/Form'
import { SelectType } from './components/SelectType'
import { SelectCategory } from './components/SelectCategory'
import { zodTransactionSchema, defaultValues } from 'utils/transaction'

import styles from './styles.module.scss'

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
      await api.post('/transaction/create', data)
    } finally {
      useFormMethods.reset()
      setTimeout(() => setLoading(false), 3000)
      setIsOpen(false)
    }
  }

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
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
              <main className={`${styles.main} scroll`}>
                <SelectType />

                <Input
                  type="text"
                  name="name"
                  label="Nome da transação"
                  placeholder="Nome da transação"
                />

                <div className={styles.line}>
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

              <footer className={styles.footer}>
                <Dialog.DialogClose className={'button ' + styles.cancel}>
                  Cancelar
                </Dialog.DialogClose>
                <button
                  type="submit"
                  disabled={loading}
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
