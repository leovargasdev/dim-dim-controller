import { Header } from 'components/Header'
import { Transactions } from 'components/Transactions'
import { NextPage } from 'next'

import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => (
  <div className={styles.container}>
    {/* <Header /> */}

    <Transactions />
  </div>
)

export default HomePage
