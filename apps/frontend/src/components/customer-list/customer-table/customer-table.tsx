import { CustomerListArgs } from '../../../apis/customers.ts'
import { FC } from 'react'
import { PICO_DATA } from '../../../pico/class-name.ts'
import { ConvertTableRowReturn, useCustomerTableQuery } from './use-customer-table-query.ts'
import { LoadingSkeleton } from '../../loading-skeleton.tsx'

type CustomerTableProps = CustomerListArgs

export const CustomerTable: FC<CustomerTableProps> = (props) => {
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

const TableBody: FC<CustomerTableProps> = (props) => {
  const { data, isLoading, isError } = useCustomerTableQuery(props)
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
  // TODO: 404 일때는 empty ui 를 보여주는 로직이 필요
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
