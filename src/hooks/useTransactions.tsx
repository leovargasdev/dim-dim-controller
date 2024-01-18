import { createContext, useContext, useEffect, useState } from 'react'

import api from 'services/api'
import { KEY_LOCAL_TRANSACTIONS } from 'utils/constants'
import type { Transaction, FormTransaction } from 'types/transaction'
import { toast } from 'sonner'
import { getTransactions } from 'services/transactions'

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

  const loadInfo = async () => {
    const data = await getTransactions()
    console.log(data)
    // setTransactions(data)
  }

  useEffect(() => {
    loadInfo()
  }, [])

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(KEY_LOCAL_TRANSACTIONS, JSON.stringify(transactions))
    }
  }, [transactions])

  const handleAddTransaction = async (data: FormTransaction) => {
    try {
      const response = await api.post('/transaction/create', data)
      setTransactions(state => [...state, response.data])
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
