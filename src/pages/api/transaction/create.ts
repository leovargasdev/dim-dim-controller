import { NextApiRequest, NextApiResponse } from 'next'
import { collection, addDoc } from 'firebase/firestore/lite'

import firebase from 'service/firebase'
import { maskNumber } from 'utils/mask'
import { zodTransactionSchema } from 'utils/transaction'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = zodTransactionSchema.parse(req.body)

  let value = maskNumber(data.value)
  value = data.type === 'in' ? value : value * -1

  const transaction = {
    name: data.name,
    category: data.category,
    date: data.date,
    value,
    created_at: new Date()
  }

  await addDoc(collection(firebase, 'transactions'), transaction)

  return res.status(201).send('')
}
