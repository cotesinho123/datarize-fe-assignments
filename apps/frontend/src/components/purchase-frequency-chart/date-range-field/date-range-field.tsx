import { PICO_DATA } from '../../../pico/class-name.ts'
import { useDateRangeDispatch, useDateRangeValue } from './date-range-field.hooks.ts'

export const DateRangeField = () => {
  const dataRange = useDateRangeValue()
  const dispatch = useDateRangeDispatch()

  return (
    <article>
      <div className={PICO_DATA.layout.classname.grid}>
        <label>
          from
          <input
            type="date"
            name="from"
            aria-label="Date"
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
        <button
          type={'button'}
          onClick={() => {
            dispatch({ type: 'COMMIT' })
          }}
        >
          날짜 적용하기
        </button>
        <input aria-invalid aria-describedby={'invalid-helper'} aria-hidden style={{ display: 'none' }} />
        {<small id="invalid-helper">{dataRange.validMessage}</small>}
      </div>
    </article>
  )
}
