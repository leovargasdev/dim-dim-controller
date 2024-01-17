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
