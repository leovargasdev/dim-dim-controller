import api from 'services/api'
import { KEY_LOCAL_TRANSACTIONS } from 'utils/constants'

export const getTransactions = async () => {
  const local = localStorage.getItem(KEY_LOCAL_TRANSACTIONS)

  if (local) {
    return JSON.parse(local)
  }

  const response = await api.get('/transaction/list')
  localStorage.setItem(KEY_LOCAL_TRANSACTIONS, JSON.stringify(response.data))

  return response.data
}
