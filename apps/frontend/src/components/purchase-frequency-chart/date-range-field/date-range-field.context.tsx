import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react'

export const DateRangeValueContext = createContext<DateRange | undefined>(undefined)
export const DateRangeDispatchContext = createContext<Dispatch<DataRangeAction> | undefined>(undefined)

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [internalDateRange, dispatch] = useReducer(dataRangeReducer, INITIAL_STATE)
  const dataRangeValue = useMemo(
    () => ({
      from: internalDateRange.from,
      to: internalDateRange.to,
      validMessage: internalDateRange.validMessage,
    }),
    [internalDateRange],
  )
  return (
    <DateRangeValueContext.Provider value={dataRangeValue}>
      <DateRangeDispatchContext.Provider value={dispatch}>{children}</DateRangeDispatchContext.Provider>
    </DateRangeValueContext.Provider>
  )
}

export interface DateRange {
  from: string
  to: string

  validMessage?: string
}

interface InternalDateRange extends DateRange {
  tempFrom: string
  tempTo: string
}
const INITIAL_STATE: InternalDateRange = {
  from: '',
  to: '',
  tempFrom: '',
  tempTo: '',
}

type DataRangeAction = { type: 'SET_FROM'; value: string } | { type: 'SET_TO'; value: string } | { type: 'COMMIT' }

const createValidMessage = (internalDateRange: InternalDateRange) => {
  const tempFrom = internalDateRange.tempFrom ?? ''
  const tempTo = internalDateRange.tempTo ?? ''
  // 아무값도 입력 안되어있는 상태는 default 7월 한달간 데이터 조회
  if (tempFrom === '' && tempTo === '') {
    return ''
  }
  if (tempFrom !== '' && tempTo === '') {
    return 'to 날짜를 선택해주세요.'
  }
  if (tempFrom === '' && tempTo !== '') {
    return 'from 날짜를 선택해주세요.'
  }
  return new Date(tempFrom) <= new Date(tempTo) ? '' : 'to 날짜가 from 날짜보다 이후를 선택해주세요.'
}

/**
 *  commit 이 필요한 이유
 *  input 기본 데이터 피커에는 날짜를 탐색하는 과정에서도 onChange 이벤트가 발생한다. 유저는 탐색과정이 아닌 탐색 후 선택한 결과에 대한 응답을 원할것이므로 임시데이터와 실제데이터를 분리한다.
 *  commit 하기 전까지는 valid 한지 판단하지 않는다.
 * */
const dataRangeReducer = (state: InternalDateRange, action: DataRangeAction) => {
  switch (action.type) {
    case 'SET_FROM':
      return {
        ...state,
        tempFrom: action.value,
      }
    case 'SET_TO':
      return {
        ...state,
        tempTo: action.value,
      }
    case 'COMMIT': {
      const validMessage = createValidMessage(state)
      if (validMessage) {
        return {
          ...state,
          validMessage,
        }
      }
      const { tempFrom, tempTo } = state
      return {
        from: tempFrom,
        to: tempTo,
        tempFrom: tempFrom,
        tempTo: tempTo,
        validMessage: '',
      }
    }

    default:
      return state
  }
}
