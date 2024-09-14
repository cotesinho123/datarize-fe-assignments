import { DateRangeProvider } from './date-range-field/date-range-field.context.tsx'
import { DateRangeField } from './date-range-field/date-range-field.tsx'

const PurchaseFrequencyChart = () => {
  return (
    <article>
      <h1>가격대별 구매 빈도 차트</h1>
      <DateRangeProvider>
        <DateRangeField />
      </DateRangeProvider>
    </article>
  )
}

export default PurchaseFrequencyChart
