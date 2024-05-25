import { ChangeEvent, useEffect, useState } from 'react'
import { MagnifyingGlass, X } from '@phosphor-icons/react'

import styles from './styles.module.scss'
import { useTransactions } from 'hooks'

interface SearchBarProps {
  onSearch: (value: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { transactions } = useTransactions()

  const [textSearch, setTextSearch] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const onChangeTextSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart()
    setTextSearch(value)

    timeoutId && clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => onSearch(value), 500))
  }

  const onClearTextSearch = () => {
    setTextSearch('')
    onSearch('')
  }

  // Quando ocorrer alguma ação na transação(Edição/Remoção)
  // O termo buscado deve ser limpado
  useEffect(() => {
    if (transactions.length > 0 && textSearch) {
      onClearTextSearch()
    }
  }, [transactions])

  return (
    <div className={styles.search}>
      <MagnifyingGlass />
      <input
        type="text"
        value={textSearch}
        onChange={onChangeTextSearch}
        placeholder="Pesquise pelo nome da transação"
      />
      <button
        type="button"
        onClick={onClearTextSearch}
        className={styles.button__clear}
        data-state={textSearch === '' ? 'hidden' : 'read'}
      >
        <X />
      </button>
    </div>
  )
}
