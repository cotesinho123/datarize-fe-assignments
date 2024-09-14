import { CustomerDto } from '../../../apis/customers.ts'

export type SimpleCustomerInfo = Pick<CustomerDto, 'id' | 'name'>
export type WithOnSelectCustomerInfo<T> = T & {
  onSelectCustomerInfo: (info: SimpleCustomerInfo) => void
}
