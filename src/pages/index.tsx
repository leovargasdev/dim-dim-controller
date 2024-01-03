import { NextPage } from 'next'

import { Transactions, Layout } from 'components'

const HomePage: NextPage = () => (
  <Layout>
    <Transactions />
  </Layout>
)

export default HomePage
