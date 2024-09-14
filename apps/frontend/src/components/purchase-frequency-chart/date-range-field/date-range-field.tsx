import { PICO_DATA } from '../../../pico/class-name.ts'
import { useDateRangeDispatch, useDateRangeValue } from './date-range-field.hooks.ts'
import { dateRangeMessage } from './date-range-field.utils.ts'

export const DateRangeField = () => {
  const dataRange = useDateRangeValue()
  const dispatch = useDateRangeDispatch()
  const { from, to } = dataRange

  return (
    <article>
      <div className={PICO_DATA.layout.classname.grid}>
        <label>
          from
          <input
            type="date"
            name="from"
            aria-label="Date"
            value={from}
            onChange={(e) =>
              dispatch({
                type: 'SET_FROM',
                value: e.target.value,
              })
            }
          />
        </label>
        <label>
          to
          <input
            type="date"
            name="to"
            aria-label="Date"
            value={to}
            onChange={(e) =>
              dispatch({
                type: 'SET_TO',
                value: e.target.value,
              })
            }
          />
        </label>
      </div>
      <div>
        <input aria-invalid aria-describedby={'invalid-helper'} aria-hidden style={{ display: 'none' }} />
        {<small id="invalid-helper">{dateRangeMessage(dataRange)}</small>}
      </div>
    </article>
  )
}
