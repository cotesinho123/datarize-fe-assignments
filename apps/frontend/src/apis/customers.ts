import { fetcher } from './fetcher.ts'
/**
 * 상품 구매한 고객 장보
 * */
export type CustomerDto = {
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
export type CustomerListArgs = {
  /**
   * 정렬 기준
   * default :undefined 일때는 id 순으로 정렬
   */
  sortBy?: 'asc' | 'desc'
  /**
   * 이름으로 검색할 수 있도록 받는 인자.
   */
  name?: string
}
type CustomersListResponse = CustomerDto[]

export type CustomerPurchaseDto = {
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

export type CustomerPurchaseListArgs = {
  customerId: number
}
export type CustomerPurchaseListResponse = CustomerPurchaseDto[]

export const customers = {
  /**
   * 고객목록 반환
   * */
  list: async (args: CustomerListArgs): Promise<CustomersListResponse> =>
    fetcher<CustomersListResponse>({
      method: 'get',
      url: `/api/customers`,
      params: args,
    }).then((res) => res.data),
  /**
   * 특정 고객의 구매 내역을 반환
   * */
  getPurchasesById: async (args: CustomerPurchaseListArgs): Promise<CustomerPurchaseListResponse> =>
    fetcher<CustomerPurchaseListResponse>({
      method: 'get',
      url: `/api/customers/${args.customerId}/purchases`,
    }).then((res) => res.data),
} as const
