import { toast } from 'sonner'
import { createContext, useContext, useEffect, useState } from 'react'

import api from 'services/api'
import { sortArray } from 'utils/array'
import { getTransactions } from 'services/transactions'
import { KEY_LOCAL_TRANSACTIONS } from 'utils/constants'
import type { Transaction, FormTransaction } from 'types/transaction'

export interface TransactionsContextData {
  transactions: Transaction[]
  addTransaction: (goal: FormTransaction) => Promise<void>
  optionFilter: string
  setOptionFilter: (option: string) => void
}

interface TransactionsProviderProps {
  children: React.ReactNode
}

const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [optionFilter, setOptionFilter] = useState<string>('')
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(KEY_LOCAL_TRANSACTIONS, JSON.stringify(transactions))
    }
  }, [transactions])

  const handleAddTransaction = async (transaction: FormTransaction) => {
    try {
      const response = await api.post('/transaction/create', transaction)
      setTransactions(state => sortArray([...state, response.data], 'date'))
      toast.success('Transação cadastrada com sucesso!')
    } catch (err) {
      console.log(err)
      toast.error('Ops... tivemos um problema!', {
        description: 'Falha ao cadastrar transação',
        duration: 5000
      })
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction: handleAddTransaction,
        optionFilter,
        setOptionFilter
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}
