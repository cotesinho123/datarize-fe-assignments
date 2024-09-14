import { CustomerDto, CustomerListArgs } from '../../apis/customers.ts'
import { PICO_DATA } from '../../pico/class-name.ts'
import { FC } from 'react'
import { LoadingSkeleton } from '../loading-skeleton.tsx'
import { useQuery } from '@tanstack/react-query'
import { apis } from '../../apis'

type PurchaseCustomerTableProps = CustomerListArgs
const usePurchaseCustomerListQuery = (args: CustomerListArgs) =>
  useQuery({
    queryKey: ['customers', args],
    queryFn: () => apis.customers.list(args),
    select: (data) => data.map(convertTableRow),
  })

type ConvertTableRowReturn = Omit<CustomerDto, 'totalAmount'> & { totalAmount: string }
const convertTableRow = (customer: CustomerDto): ConvertTableRowReturn => ({
  ...customer,
  totalAmount: `${customer.totalAmount.toLocaleString()}원`,
})

export const PurchaseCustomerTable: FC<PurchaseCustomerTableProps> = (props) => {
  return (
    <table className={PICO_DATA.layout.classname.container}>
      <TableHeader />
      <TableBody {...props} />
    </table>
  )
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope={PICO_DATA.table.scope.col}>id</th>
        <th scope={PICO_DATA.table.scope.col}>이름</th>
        <th scope={PICO_DATA.table.scope.col}>총 구매 횟수</th>
        <th scope={PICO_DATA.table.scope.col}>총 구매 금액</th>
      </tr>
    </thead>
  )
}

const TableBody: FC<PurchaseCustomerTableProps> = (props) => {
  const { data, isLoading, isError } = usePurchaseCustomerListQuery(props)
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td>
            <LoadingSkeleton minHeight={'600px'} />
          </td>
        </tr>
      </tbody>
    )
  }
  if (isError) {
    return <div>에러 발생</div>
  }

  return (
    <tbody>
      {data.map((customer) => (
        <TableRow key={customer.id} {...customer} />
      ))}
    </tbody>
  )
}
const TableRow: FC<ConvertTableRowReturn> = ({ id, name, count, totalAmount }) => {
  return (
    <tr style={{ cursor: 'pointer' }}>
      <th scope={PICO_DATA.table.scope.row}>{id}</th>
      <td>{name}</td>
      <td>{count}</td>
      <td>{totalAmount}</td>
    </tr>
  )
}
