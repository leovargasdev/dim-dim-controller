import type { NextApiResponse, NextApiRequest } from 'next'

import { db, DB_NAMES } from 'services/firebase'
import { updateDoc, doc, deleteDoc } from 'firebase/firestore/lite'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const transactionId = req.query.id as string
    const transactionRef = doc(db, DB_NAMES.transactions, transactionId)

    if (req.method === 'PUT') {
      const transaction = req.body
      delete transaction.id
      await updateDoc(transactionRef, transaction)

      return res.status(200).send({ ok: true })
    }

    if (req.method === 'DELETE') {
      await deleteDoc(transactionRef)

      return res.status(200).send({ ok: true })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
}
