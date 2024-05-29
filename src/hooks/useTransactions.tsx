import { toast } from 'sonner'
import { createContext, useContext, useEffect, useState } from 'react'

import api from 'services/api'
import { sortArray } from 'utils/array'
import { getTransactions } from 'services/transactions'
import { KEY_LOCAL_TRANSACTIONS } from 'utils/constants'
import type { Transaction, FormTransaction } from 'types/transaction'

export interface TransactionsContextData {
  monthFilter: string
  setMonthFilter: (month: string) => void
  transactions: Transaction[]
  addTransaction: (transaction: FormTransaction) => Promise<void>
  handleEditTransaction: (transaction: Transaction) => void
  handleRemoveTransaction: (transactionId: string) => void
}

interface TransactionsProviderProps {
  children: React.ReactNode
}

const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [monthFilter, setMonthFilter] = useState<string>('')
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // const transactionsFiltred = useMemo(() => {
  //   return transactions.filter(trans => trans.monthFilter === monthFilter)
  // }, [transactions, monthFilter])

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

  const handleRemoveTransaction = async (transactionId: string) => {
    try {
      await api.delete('/transaction/' + transactionId)

      setTransactions(state => state.filter(t => t.id !== transactionId))
      toast.success('Transação removida com sucesso!')
    } catch (err) {
      console.log(err)
      toast.error('Ops... tivemos um problema!', {
        description: 'Falha ao remover transação',
        duration: 5000
      })
    }
  }

  const handleEditTransaction = async (transaction: Transaction) => {
    await api.put('/transaction/' + transaction.id, transaction)

    setTransactions(state =>
      state.map(t => {
        const isUpdate = t.id === transaction.id
        return isUpdate ? { ...t, ...transaction } : t
      })
    )
  }

  return (
    <TransactionsContext.Provider
      value={{
        monthFilter,
        setMonthFilter,
        transactions,
        addTransaction: handleAddTransaction,
        handleEditTransaction,
        handleRemoveTransaction
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
