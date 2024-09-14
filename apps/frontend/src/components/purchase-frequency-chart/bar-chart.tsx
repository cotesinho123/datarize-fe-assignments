import { apis } from '../../apis'
import { useQuery } from '@tanstack/react-query'
import { useDateRangeValue } from './date-range-field/date-range-field.hooks.ts'
import { isDateRangeValid } from './date-range-field/date-range-field.utils.ts'
import ReactECharts from 'echarts-for-react'

type Args = Parameters<typeof apis.purchaseFrequency.list>[0]
const usePurchaseFrequencyQuery = (args: Args) =>
  useQuery({
    queryKey: ['purchaseFrequency', args],
    queryFn: () => apis.purchaseFrequency.list(args),
    enabled: isDateRangeValid(args),
    keepPreviousData: true,
  })

export const BarChart = () => {
  const dateRange = useDateRangeValue()
  const { data, isLoading, isError } = usePurchaseFrequencyQuery(dateRange)
  if (isLoading) {
    return <div>로딩 중...</div>
  }
  if (isError) {
    return <div>에러 발생</div>
  }
  return (
    <ReactECharts
      style={{ minHeight: '500px' }}
      option={{
        title: {
          text: '7월 구매빈도 차트',
          left: 'center', // 제목을 가운데 정렬
        },
        yAxis: {
          type: 'category',
          data: data?.map((d) => convertRangeToLabel(d.range)) ?? [],
          name: '금액별 구분(만원단위)',
          offset: 20,
        },
        xAxis: {
          type: 'value',
          name: '구매 횟수',
          offset: 20,
        },
        series: [
          {
            data: data?.map((d) => d.count) ?? [],
            type: 'bar',
          },
        ],
        grid: {
          left: '15%',
          right: '15%',
        },
      }}
    />
  )
}

const convertRangeToLabel = (range: string) => {
  const map: Record<string, string> = {
    '0 - 20000': '0원 ~ 2만원',
    '20001 - 30000': '2만원 ~ 3만원',
    '30001 - 40000': '3만원 ~ 4만원',
    '40001 - 50000': '4만원 ~ 5만원',
    '50001 - 60000': '5만원 ~ 6만원',
    '60001 - 70000': '6만원 ~ 7만원',
    '70001 - 80000': '7만원 ~ 8만원',
    '80001 - 90000': '8만원 ~ 9만원',
    '90001 - 100000': '9만원 ~ 10만원',
  }
  // 이런 예외케이스가 없을거라 가정하고 작성한 코드 서버와 협업 필요 혹은 인자를 파싱해서 모든 경우를 고려하도록 수정 필요
  if (!map[range]) {
    return '알 수 없음'
  }
  return map[range]
}
