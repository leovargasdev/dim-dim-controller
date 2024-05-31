import { useTransactions } from 'hooks'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'

interface SearchBarProps {
  onSearch: (value: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { transactions } = useTransactions()

  const refInput = useRef<HTMLInputElement>(null)
  const searchValue = refInput?.current?.value ?? ''

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const onChangeTextSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart()

    timeoutId && clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => onSearch(value), 500))
  }

  const onClearTextSearch = () => {
    if (transactions.length > 0 && searchValue !== '') {
      // @ts-ignore
      refInput.current.value = ''
      onSearch('')
    }
  }

  // Ao ocorrer alguma alteração na lista de transações(Edição/Remoção), o campo de busca será resetado.
  useEffect(onClearTextSearch, [transactions])

  return (
    <div className={styles.search}>
      <MagnifyingGlass />
      <input
        type="text"
        ref={refInput}
        onChange={onChangeTextSearch}
        placeholder="Pesquise pelo nome da transação"
      />
      <button
        type="button"
        onClick={onClearTextSearch}
        className={styles.button__clear}
        data-state={searchValue === '' ? 'hidden' : 'read'}
      >
        <X />
      </button>
    </div>
  )
}
