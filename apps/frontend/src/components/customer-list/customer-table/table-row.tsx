import { FC } from 'react'
import { ConvertTableRowReturn } from './use-customer-table-query.ts'
import { PICO_DATA } from '../../../pico/class-name.ts'
import { WithOnSelectCustomerInfo } from './customer-table.types.ts'

export const TableRow: FC<WithOnSelectCustomerInfo<ConvertTableRowReturn>> = ({
  id,
  name,
  count,
  totalAmount,
  onSelectCustomerInfo,
}) => {
  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => onSelectCustomerInfo({ id, name })}>
      <th scope={PICO_DATA.table.scope.row}>{id}</th>
      <td>{name}</td>
      <td>{count}</td>
      <td>{totalAmount}</td>
    </tr>
  )
}
