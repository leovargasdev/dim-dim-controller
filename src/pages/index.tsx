import { NextPage } from 'next'

import { Transactions, Layout } from 'components'
import { Money } from '@phosphor-icons/react'

import home from 'styles/home.module.scss'

const HomePage: NextPage = () => (
  <Layout>
    <div>
      <div>
        <div>
          <h2>Receita total(mês)</h2>
          <Money size={32} />
        </div>
        <div>
          <strong>R$ 9150,90</strong>
          <p>
            <span>+4%</span>em relação ao mês passado
          </p>
        </div>
      </div>
    </div>
    <Transactions />
  </Layout>
)

export default HomePage
