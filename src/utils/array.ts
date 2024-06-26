import { normalizeString } from './format'

export const searchValueInArray = (
  data: any[],
  propName: 'name' | 'value',
  valueSearch: string
) => {
  const value = normalizeString(valueSearch)
  return data.filter(item => normalizeString(item[propName]).includes(value))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortArray = (data: any[], propName: string): any[] => {
  if (propName === 'date') {
    return data.sort(
      (itemA, itemB) =>
        new Date(itemB.date).getTime() - new Date(itemA.date).getTime()
    )
  }

  return data.sort((itemA, itemB) =>
    itemA[propName].localeCompare(itemB[propName])
  )
}
