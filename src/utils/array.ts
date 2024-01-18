import { Option } from 'types/global'
import { normalizeString } from './format'

export const searchValueInArray = (
  data: Option[],
  propName: 'name' | 'value',
  valueSearch: string
): Option[] => {
  const value = normalizeString(valueSearch)
  return data.filter(item => normalizeString(item[propName]).includes(value))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortArray = (data: any[], propName: string): any[] => {
  return data.sort((itemA, itemB) =>
    itemA[propName].localeCompare(itemB[propName])
  )
}
