import type { NextApiResponse, NextApiRequest } from 'next'

import { db } from 'services/firebase'
import { sortArray } from 'utils/array'
import { formatDate } from 'utils/format'
import { collection, getDocs, query } from 'firebase/firestore/lite'

const NAME_COLLECTION = 'transactions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const user_id = getCookie('dim-dim-controler-user', { req, res })

  try {
    const collectionTransactions = collection(db, NAME_COLLECTION)
    const dbTransactions = query(collectionTransactions)

    const { docs } = await getDocs(dbTransactions)

    const transactions = docs.map(doc => {
      const transaction = doc.data()
      const id = doc.id
      const monthFilter = formatDate(transaction.date, 'MMMM-yyyy')
      return { ...transaction, id, monthFilter }
    })

    return res.status(200).send(sortArray(transactions, 'date'))
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
}
