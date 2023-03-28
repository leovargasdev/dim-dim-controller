import styles from './styles.module.scss'

import transactions from './data.json'

export const Transactions = () => {
  const formatedCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className={styles.box}>
      <h1>Transações</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Valor</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transation => (
            <tr key={transation.value}>
              <td>{transation.name}</td>
              <td>{transation.date}</td>
              <td>{transation.type}</td>
              <td>{transation.category}</td>
              <td>{formatedCurrency(transation.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
