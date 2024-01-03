import { formatDate } from 'utils/format'

export const defaultValues = {
  name: '',
  date: formatDate(new Date(), 'yyyy-MM-dd'),
  type: 'in',
  category: '',
  value: ''
}
