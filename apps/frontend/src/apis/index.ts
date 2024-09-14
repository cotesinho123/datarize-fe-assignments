import axios, { AxiosRequestConfig } from 'axios'

const axiosConfig: AxiosRequestConfig = {
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
}

const axiosRequest = axios.create(axiosConfig)

type PurchaseFrequencyListArgs = {
  // format : 'YYYY-MM-DD'
  from?: string
  // format : 'YYYY-MM-DD'
  to?: string
}
type PurchaseFrequencyDto = {
  // range format : `${number} - ${number}`
  range: string
  count: number
}
type PurchaseFrequencyListResponse = PurchaseFrequencyDto[]

/**
 * 상품 구매한 고객 장보
 * */
type CustomerDto = {
  id: number
  name: string
  /**
   * 총 구매 횟수
   * */
  count: number
  /**
   * 총 구매 금액
   * */
  totalAmount: number
}
type CustomerListArgs = {
  /**
   * 정렬 기준
   * default : asc
   */
  sortBy?: 'asc' | 'desc'
  /**
   * 이름으로 검색할 수 있도록 받는 인자.
   */
  name?: string
}
type CustomersListResponse = CustomerDto[]

type CustomerPurchaseDto = {
  /**
   * format : 'YYYY-MM-DD'
   * */
  date: string
  quantity: number
  /**
   * 상품 이름
   * */
  product: string
  /**
   * 상품 가격
   * */
  price: number
  /**
   * 상품 이미지
   * */
  imgSrc: string
}

type CustomerPurchaseListArgs = {
  customerId: number
}
type CustomerPurchaseListResponse = CustomerPurchaseDto[]

const baseURL = 'http://localhost:4000'

export const Apis = {
  /**
   * 한 달 동안의 모든 구매 데이터를 반환
   * */
  purchaseFrequency: {
    list: async (args: PurchaseFrequencyListArgs): Promise<PurchaseFrequencyListResponse> =>
      axiosRequest<PurchaseFrequencyListResponse>({
        baseURL: baseURL,
        method: 'get',
        url: '/api/purchase-frequency',
        params: args,
      }).then((res) => res.data),
  },
  customers: {
    list: async (args: CustomerListArgs): Promise<CustomersListResponse> =>
      axiosRequest<CustomersListResponse>({
        baseURL: baseURL,
        method: 'get',
        url: `/api/customers`,
        params: args,
      }).then((res) => res.data),
    getPurchasesById: async (args: CustomerPurchaseListArgs): Promise<CustomerPurchaseListResponse> =>
      axiosRequest<CustomerPurchaseListResponse>({
        baseURL: baseURL,
        method: 'get',
        url: `/api/customers/${args.customerId}/purchases`,
      }).then((res) => res.data),
  },
}
