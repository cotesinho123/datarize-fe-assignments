import { useState } from 'react'
import { PurchaseCustomerTable } from './purchase-customer-table.tsx'
import { CustomerListArgs } from '../../apis/customers.ts'

type SortType = CustomerListArgs['sortBy']
type NameType = CustomerListArgs['name']

export const PurchaseCustomerList = () => {
  const [sort, setSort] = useState<SortType>()
  const [name, setName] = useState<NameType>()

  return (
    <article>
      <h1>가장 많이 구매한 고객 목록</h1>
      <PurchaseCustomerTable sortBy={sort} name={name} />
    </article>
  )
}
