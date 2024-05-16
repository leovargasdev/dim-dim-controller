import { NextPage } from 'next'
import { Money } from '@phosphor-icons/react'
import { TransactionsFilter, TransactionsList } from './components'

const HomePage: NextPage = () => (
  <>
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

    <TransactionsFilter />

    <TransactionsList />
  </>
)

export default HomePage
