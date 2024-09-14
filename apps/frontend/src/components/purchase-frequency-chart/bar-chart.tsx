import { apis } from '../../apis'
import { useQuery } from '@tanstack/react-query'
import { useDateRangeValue } from './date-range-field/date-range-field.hooks.ts'
import { isDateRangeValid } from './date-range-field/date-range-field.utils.ts'

type Args = Parameters<typeof apis.purchaseFrequency.list>[0]
const usePurchaseFrequencyQuery = (args: Args) =>
  useQuery({
    queryKey: ['purchaseFrequency', args],
    queryFn: () => apis.purchaseFrequency.list(args),
    enabled: isDateRangeValid(args),
    keepPreviousData: true,
  })

export const BarChart = () => {
  const dateRange = useDateRangeValue()
  const { data } = usePurchaseFrequencyQuery(dateRange)
  console.log(data)
  return <div>{!!data && JSON.stringify(data)}</div>
}
