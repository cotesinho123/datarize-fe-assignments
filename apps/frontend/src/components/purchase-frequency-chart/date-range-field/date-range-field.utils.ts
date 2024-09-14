// 1차로 서버의 데이터 valid 기준으로 체크하고 시간이 여유로우면 검증로직 추가하여 서버 부하 막는다.
import { DateRange } from './date-range-field.context.tsx'

export const isDateRangeValid = (dateRange: Partial<DateRange>) => {
  const { from, to } = { from: dateRange.from ?? '', to: dateRange.to ?? '' }

  if (from === '' && to === '') {
    return true
  }
  if (from !== '' && to === '') {
    return false
  }
  if (from === '' && to !== '') {
    return false
  }
  return new Date(from) <= new Date(to)
}
