import { createContext, Dispatch, ReactNode, useReducer } from 'react'

export const DateRangeValueContext = createContext<DataRange | undefined>(undefined)
export const DateRangeDispatchContext = createContext<Dispatch<DataRangeAction> | undefined>(undefined)

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [dataRange, dispatch] = useReducer(dataRangeReducer, INITIAL_STATE)

  return (
    <DateRangeValueContext.Provider value={dataRange}>
      <DateRangeDispatchContext.Provider value={dispatch}>{children}</DateRangeDispatchContext.Provider>
    </DateRangeValueContext.Provider>
  )
}

export interface DataRange {
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
