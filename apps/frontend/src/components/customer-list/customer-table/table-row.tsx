import { FC } from 'react'
import { ConvertTableRowReturn } from './use-customer-table-query.ts'
import { PICO_DATA } from '../../../pico/class-name.ts'

export const TableRow: FC<ConvertTableRowReturn> = ({ id, name, count, totalAmount }) => {
  return (
    <tr style={{ cursor: 'pointer' }}>
      <th scope={PICO_DATA.table.scope.row}>{id}</th>
      <td>{name}</td>
      <td>{count}</td>
      <td>{totalAmount}</td>
    </tr>
  )
}
