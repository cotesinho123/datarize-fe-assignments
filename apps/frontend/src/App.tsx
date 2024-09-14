import PurchaseFrequencyChart from './components/purchase-frequency-chart'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PurchaseCustomerList } from './components/purchase-customer-list'
const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PurchaseFrequencyChart />
        <PurchaseCustomerList />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
