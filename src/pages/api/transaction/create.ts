import { NextApiRequest, NextApiResponse } from 'next'
import { collection, addDoc } from 'firebase/firestore/lite'

import { db, DB_NAMES } from 'services/firebase'
import { zodTransactionSchema } from 'utils/transaction'
import { convertCurrencyToFloat, formatDate } from 'utils/format'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const data = zodTransactionSchema.parse(req.body)

      const transaction = {
        ...data,
        date: new Date(data.date),
        created_at: new Date(),
        value: convertCurrencyToFloat(data.value),
        tags: data.tags.map(tag => tag.name)
      }

      const transactionsCollection = collection(db, DB_NAMES.transactions)
      const { id } = await addDoc(transactionsCollection, transaction)

      const monthFilter = formatDate(transaction.date, 'MMMM-yyyy')

      return res.status(200).send({ ...transaction, id, monthFilter })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
}
