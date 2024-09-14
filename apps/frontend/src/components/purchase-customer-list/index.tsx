import { FC, useState } from 'react'
import { PurchaseCustomerTable } from './purchase-customer-table.tsx'
import { CustomerListArgs } from '../../apis/customers.ts'
import { PICO_DATA } from '../../pico/class-name.ts'
import { useDebounce } from '../../hooks/use-debounce.ts'

type SortType = CustomerListArgs['sortBy']
type NameType = CustomerListArgs['name']

const isSortType = (value: string): value is Required<CustomerListArgs>['sortBy'] => value === 'asc' || value === 'desc'
export const PurchaseCustomerList = () => {
  const [sort, setSort] = useState<SortType>()
  const [name, setName] = useState<NameType>()
  const debouncedName = useDebounce(name, 300)
  return (
    <article>
      <h1>가장 많이 구매한 고객 목록</h1>
      <FilterSection onSortChange={setSort} onNameChange={setName} />
      <PurchaseCustomerTable sortBy={sort} name={debouncedName} />
    </article>
  )
}

type FilterSectionProps = {
  onSortChange: (sort: SortType) => void
  onNameChange: (name: NameType) => void
}
const FilterSection: FC<FilterSectionProps> = ({ onSortChange, onNameChange }) => {
  return (
    <article className={PICO_DATA.layout.classname.grid}>
      <label>
        이름 검색
        <input
          type="search"
          name="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => onNameChange(e.target.value)}
        />
      </label>

      <label>
        정렬선택
        <select
          onChange={(e) => {
            const value = e.target.value
            if (value === '') {
              onSortChange(undefined)
            } else if (isSortType(value)) {
              onSortChange(value)
            }
          }}
        >
          <option value="">id 오름차 순</option>
          <option value="asc">총 구매 금액 오름차 순</option>
          <option value="desc">총 구매 금액 내림차 순</option>
        </select>
      </label>
    </article>
  )
}
