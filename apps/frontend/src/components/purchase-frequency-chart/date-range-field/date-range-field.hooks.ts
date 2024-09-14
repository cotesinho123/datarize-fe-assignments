import { useContext } from 'react'
import { DateRangeDispatchContext, DateRangeValueContext } from './date-range-field.context.tsx'

export const useDateRangeValue = () => {
  const context = useContext(DateRangeValueContext)
  if (context === undefined) {
    throw new Error('useDateRangeValue 는 DateRangeProvider 자식 컴포넌트에서 사용 가능합니다.')
  }
  return context
}

export const useDateRangeDispatch = () => {
  const context = useContext(DateRangeDispatchContext)
  if (context === undefined) {
    throw new Error('useDateRangeDispatch 는 DateRangeProvider 자식 컴포넌트에서 사용 가능합니다.')
  }
  return context
}
