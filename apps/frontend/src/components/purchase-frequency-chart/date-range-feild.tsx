import { useReducer } from 'react'
import { PICO_DATA } from '../../pico/class-name.ts'

interface DataRange {
  from: string
  to: string
}
const INITIAL_STATE: DataRange = {
  from: '',
  to: '',
}

type DataRangeAction = { type: 'SET_FROM'; value: string } | { type: 'SET_TO'; value: string }

const dataRangeReducer = (state: DataRange, action: DataRangeAction) => {
  switch (action.type) {
    case 'SET_FROM':
      return {
        ...state,
        from: action.value,
      }
    case 'SET_TO':
      return {
        ...state,
        to: action.value,
      }
    default:
      return state
  }
}

// 1차로 서버의 데이터 valid 기준으로 체크하고 시간이 여유로우면 검증로직 추가하여 서버 부하 막는다.
const dataRangeMessage = ({ from, to }: DataRange) => {
  // 아무값도 입력 안되어있는 상태는 default 7월 한달간 데이터 조회
  if (from === '' && to === '') {
    return ''
  }
  if (from !== '' && to === '') {
    return 'to 날짜를 선택해주세요.'
  }
  if (from === '' && to !== '') {
    return 'from 날짜를 선택해주세요.'
  }
  return new Date(from) <= new Date(to) ? '' : 'to 날짜가 from 날짜보다 이후를 선택해주세요.'
}

export const DateRangeField = () => {
  const [dataRange, dispatch] = useReducer(dataRangeReducer, INITIAL_STATE)
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
        {<small id="invalid-helper">{dataRangeMessage(dataRange)}</small>}
      </div>
    </article>
  )
}
