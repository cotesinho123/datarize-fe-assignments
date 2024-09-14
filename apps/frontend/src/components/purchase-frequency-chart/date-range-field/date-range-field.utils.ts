// 1차로 서버의 데이터 valid 기준으로 체크하고 시간이 여유로우면 검증로직 추가하여 서버 부하 막는다.
import { DataRange } from './date-range-field.context.tsx'

export const dateRangeMessage = ({ from, to }: DataRange) => {
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

export const isDateRangeValid = ({ from, to }: Partial<DataRange>) => {
  const requiredDateRange = { from: from ?? '', to: to ?? '' }
  return dateRangeMessage(requiredDateRange) === ''
}
