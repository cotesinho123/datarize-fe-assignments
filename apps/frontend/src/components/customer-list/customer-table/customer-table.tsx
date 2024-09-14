import { CustomerListArgs } from '../../../apis/customers.ts'
import { FC, useState } from 'react'
import { PICO_DATA } from '../../../pico/class-name.ts'
import { useCustomerTableQuery } from './use-customer-table-query.ts'
import { LoadingSkeleton } from '../../loading-skeleton.tsx'
import { isAxiosError } from 'axios'
import { TableRow } from './table-row.tsx'
import { CustomerDetailModal } from './cusotmer-detail-modal.tsx'
import { SimpleCustomerInfo, WithOnSelectCustomerInfo } from './customer-table.types.ts'

type CustomerTableProps = CustomerListArgs

export const CustomerTable: FC<CustomerTableProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCustomerInfo, setSelectedCustomerInfo] = useState<SimpleCustomerInfo | undefined>(undefined)

  const handleSelectCustomer = (info: SimpleCustomerInfo) => {
    setSelectedCustomerInfo(info)
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <>
      <table className={PICO_DATA.layout.classname.container}>
        <TableHeader />
        <TableBody {...props} onSelectCustomerInfo={handleSelectCustomer} />
      </table>
      <CustomerDetailModal isOpen={isOpen} customerInfo={selectedCustomerInfo} onClose={closeModal} />
    </>
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

const TableBody: FC<WithOnSelectCustomerInfo<CustomerTableProps>> = (props) => {
  const { data, isLoading, error, isError } = useCustomerTableQuery(props)
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
  // todo: 시간 있으면 에러처리 유려하게 하자
  if (isError) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return (
        <tbody>
          <tr>
            <td>
              <div>데이터가 없습니다.</div>
            </td>
          </tr>
        </tbody>
      )
    }
    return (
      <tbody>
        <tr>
          <td>
            <div>에러가 발생했습니다.</div>
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {data.map((customer) => (
        <TableRow key={customer.id} {...customer} onSelectCustomerInfo={props.onSelectCustomerInfo} />
      ))}
    </tbody>
  )
}
