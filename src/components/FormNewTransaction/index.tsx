import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import api from 'services/api'
import { maskMoney } from 'utils/mask'
import CATEGORIES from 'data/categories'
import TYPE_TRANSACTIONS from 'data/type-transactions'
import { zodTransactionSchema, defaultValues } from 'utils/transaction'

import {
  Autocomplete,
  CalendarPicker,
  Input,
  SelectCell
} from 'components/Form'

import styles from './styles.module.scss'
import { FormTransaction } from 'types/transaction'

export const FormNewTransaction = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const useFormMethods = useForm<FormTransaction>({
    mode: 'all',
    resolver: zodResolver(zodTransactionSchema),
    defaultValues
  })

  const onSubmit = async (data: FormTransaction): Promise<void> => {
    setLoading(true)
    console.log(data)
    try {
      // const r = await api.post('/transaction/create', data)
      // console.log(r)
    } finally {
      // useFormMethods.reset()
      setLoading(false)
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
                label="Tipo de transação"
                options={TYPE_TRANSACTIONS}
              />

              <Input
                type="text"
                label="Valor"
                name="value"
                placeholder="R$ 0,00"
                maxLength={13}
                mask={maskMoney}
              />

              <Autocomplete
                type="text"
                name="name"
                label="Descrição"
                placeholder="Descrição"
                options={[
                  {
                    value: '10164',
                    name: 'Adaptabilidade'
                  },
                  {
                    value: '10165',
                    name: 'Alteridade'
                  },
                  {
                    value: '10166',
                    name: 'Atenção'
                  },
                  {
                    value: '10167',
                    name: 'Atendimento ao cliente'
                  },
                  {
                    value: '10168',
                    name: 'Autonomia'
                  },
                  {
                    value: '10169',
                    name: 'Boa comunicação'
                  },
                  {
                    value: '10170',
                    name: 'Compaixão'
                  },
                  {
                    value: '10171',
                    name: 'Competência'
                  },
                  {
                    value: '10172',
                    name: 'Comunicação escrita'
                  },
                  {
                    value: '10173',
                    name: 'Confiança'
                  },
                  {
                    value: '10174',
                    name: 'Controle emocional'
                  },
                  {
                    value: '10175',
                    name: 'Criatividade'
                  },
                  {
                    value: '10176',
                    name: 'Delegação'
                  },
                  {
                    value: '10177',
                    name: 'Determinação'
                  },
                  {
                    value: '10178',
                    name: 'Empatia'
                  },
                  {
                    value: '10179',
                    name: 'Ética'
                  },
                  {
                    value: '10180',
                    name: 'Falar em público'
                  },
                  {
                    value: '10181',
                    name: 'Flexibilidade'
                  },
                  {
                    value: '10182',
                    name: 'Foco em resultados'
                  },
                  {
                    value: '10183',
                    name: 'Inovação'
                  },
                  {
                    value: '10283',
                    name: 'Inteligência'
                  },
                  {
                    value: '10284',
                    name: 'Liderança'
                  },
                  {
                    value: '10285',
                    name: 'Negociação'
                  },
                  {
                    value: '10286',
                    name: 'Orçamento'
                  },
                  {
                    value: '10184',
                    name: 'Organização'
                  },
                  {
                    value: '10185',
                    name: 'Paciência'
                  },
                  {
                    value: '10186',
                    name: 'Pensamento crítico'
                  },
                  {
                    value: '10187',
                    name: 'Persuasão'
                  },
                  {
                    value: '10188',
                    name: 'Proatividade'
                  },
                  {
                    value: '10189',
                    name: 'Raciocínio lógico'
                  },
                  {
                    value: '10190',
                    name: 'Resiliência'
                  },
                  {
                    value: '10191',
                    name: 'Resolução de conflitos'
                  },
                  {
                    value: '10192',
                    name: 'Resolução de problemas'
                  },
                  {
                    value: '10193',
                    name: 'Respeito a prazos'
                  },
                  {
                    value: '10194',
                    name: 'Trabalho em equipe'
                  }
                ]}
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
