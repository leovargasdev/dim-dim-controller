import { NextApiRequest, NextApiResponse } from 'next'
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
    value
  }
  return res.status(201).send('')
}
