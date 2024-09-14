import { useState } from 'react'
import { PurchaseCustomerTable } from './purchase-customer-table.tsx'
import { CustomerListArgs } from '../../apis/customers.ts'
import { PICO_DATA } from '../../pico/class-name.ts'

type SortType = CustomerListArgs['sortBy']
type NameType = CustomerListArgs['name']

const isSortType = (value: string): value is Required<CustomerListArgs>['sortBy'] => value === 'asc' || value === 'desc'
export const PurchaseCustomerList = () => {
  const [sort, setSort] = useState<SortType>()
  const [name, setName] = useState<NameType>()

  return (
    <article>
      <h1>가장 많이 구매한 고객 목록</h1>
      <article className={PICO_DATA.layout.classname.grid}>
        <select
          onChange={(e) => {
            const value = e.target.value
            if (value === '') {
              setSort(undefined)
            } else if (isSortType(value)) {
              setSort(value)
            }
          }}
        >
          <option value="">id 오름차 순</option>
          <option value="asc">총 구매 금액 오름차 순</option>
          <option value="desc">총 구매 금액 내림차 순</option>
        </select>
      </article>
      <PurchaseCustomerTable sortBy={sort} name={name} />
    </article>
  )
}
