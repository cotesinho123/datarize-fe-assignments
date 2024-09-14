import { fetcher } from './fetcher.ts'

export type PurchaseFrequencyListArgs = {
  /**
   * format : 'YYYY-MM-DD'
   */
  from?: string
  /**
   * format : 'YYYY-MM-DD'
   */
  to?: string
}
export type PurchaseFrequencyDto = {
  /** range format : `${number} - ${number}` **/
  range: string
  count: number
}
export type PurchaseFrequencyListResponse = PurchaseFrequencyDto[]
export const purchaseFrequency = {
  /**
   * 한 달 동안의 모든 구매 데이터를 반환
   * */
  list: async (args: PurchaseFrequencyListArgs): Promise<PurchaseFrequencyListResponse> =>
    fetcher<PurchaseFrequencyListResponse>({
      method: 'get',
      url: '/api/purchase-frequency',
      params: args,
    }).then((res) => res.data),
} as const
