import { CustomerDto, CustomerListArgs } from '../../../apis/customers.ts'
import { useQuery } from '@tanstack/react-query'
import { apis } from '../../../apis'

export const useCustomerTableQuery = (args: CustomerListArgs) =>
  useQuery({
    queryKey: ['customers', args],
    queryFn: () => apis.customers.list(args),
    select: (data) => data.map(convertTableRow),
    // 404일 수 있으므로 재시도하지 않는다.
    retry: false,
  })

export type ConvertTableRowReturn = Omit<CustomerDto, 'totalAmount'> & { totalAmount: string }
const convertTableRow = (customer: CustomerDto): ConvertTableRowReturn => ({
  ...customer,
  totalAmount: `${customer.totalAmount.toLocaleString()}원`,
})
