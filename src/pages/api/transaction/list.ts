import type { NextApiResponse, NextApiRequest } from 'next'

import { db } from 'services/firebase'
import { sortArray } from 'utils/array'
import { formatDate } from 'utils/format'
import { collection, getDocs, query } from 'firebase/firestore'

const NAME_COLLECTION = 'transactions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const user_id = getCookie('dim-dim-controler-user', { req, res })
  console.log('entrou')

  try {
    const collectionTransactions = collection(db, NAME_COLLECTION)
    console.log('entrou222')
    const dbTransactions = query(collectionTransactions)
    console.log('entrou23333')

    const { docs } = await getDocs(dbTransactions)
    const transactions = docs.map(doc => {
      const transaction = doc.data()

      console.log(transaction, 'aaa')

      return transaction
      // const id = doc.id
      // const keyFilter = formatDate(transaction.date, 'MMMM-yyyy')
      // return { ...transaction, id, keyFilter }
    })

    return res.status(200).send(sortArray(transactions, 'date'))
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
}
