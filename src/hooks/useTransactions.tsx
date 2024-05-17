import { toast } from 'sonner'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import api from 'services/api'
import { sortArray } from 'utils/array'
import { getTransactions } from 'services/transactions'
import { KEY_LOCAL_TRANSACTIONS } from 'utils/constants'
import type { Transaction, FormTransaction } from 'types/transaction'

export interface TransactionsContextData {
  monthFilter: string
  setMonthFilter: (month: string) => void
  transactions: Transaction[]
  transactionsFiltred: Transaction[]
  addTransaction: (transaction: FormTransaction) => Promise<void>
  // onEditTransaction: (transaction: Transaction) => void
}

interface TransactionsProviderProps {
  children: React.ReactNode
}

const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [monthFilter, setMonthFilter] = useState<string>('')
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

  const transactionsFiltred = useMemo(() => {
    return transactions.filter(trans => trans.monthFilter === monthFilter)
  }, [transactions, monthFilter])

  return (
    <TransactionsContext.Provider
      value={{
        monthFilter,
        transactions,
        addTransaction: handleAddTransaction,
        transactionsFiltred,
        setMonthFilter
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
