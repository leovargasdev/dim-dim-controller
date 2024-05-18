import { NextPage } from 'next'
import {
  TransactionsFilter,
  TransactionsList,
  TransactionsResume
} from './components'

import styles from './styles.module.scss'

const TransactionsPage: NextPage = () => (
  <div className={styles.container}>
    <TransactionsResume />
    <TransactionsFilter />
    <TransactionsList />
  </div>
)

export default TransactionsPage