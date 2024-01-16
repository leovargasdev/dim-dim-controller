import { NextApiRequest, NextApiResponse } from 'next'
import { collection, addDoc } from 'firebase/firestore/lite'

import { db } from 'services/firebase'
import { zodTransactionSchema } from 'utils/transaction'
import { formatCurrencyToFloat, formatDate } from 'utils/format'

const NAME_COLLECTION = 'transactions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const data = zodTransactionSchema.parse(req.body)

      const transaction = {
        ...data,
        date: new Date(data.date),
        created_at: new Date(),
        value: formatCurrencyToFloat(data.value)
      }

      const transactionsCollection = collection(db, NAME_COLLECTION)
      const { id } = await addDoc(transactionsCollection, transaction)

      const monthFilter = formatDate(transaction.date, 'MMMM-yyyy')

      return res.status(200).send({ ...transaction, id, monthFilter })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
}
