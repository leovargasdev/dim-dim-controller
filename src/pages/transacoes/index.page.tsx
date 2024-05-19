import { NextPage } from 'next'
import { TransactionsList, TransactionsResume } from './components'

import styles from './styles.module.scss'
import { TransactionsList2 } from './components/List2'

const TransactionsPage: NextPage = () => (
  <div className={styles.container}>
    <TransactionsResume />
    {/* <TransactionsFilter /> */}
    <TransactionsList2 />
    <TransactionsList />
  </div>
)

export default TransactionsPage
