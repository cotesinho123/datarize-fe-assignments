import { FC } from 'react'
import { CustomerPurchaseDto, CustomerPurchaseListArgs } from '../../../apis/customers.ts'
import { useQuery } from '@tanstack/react-query'
import { apis } from '../../../apis'
import { SimpleCustomerInfo } from './customer-table.types.ts'
import { PICO_DATA } from '../../../pico/class-name.ts'
import { LoadingSkeleton } from '../../loading-skeleton.tsx'

type CustomerDetailModalProps = {
  customerInfo?: SimpleCustomerInfo
  onClose: () => void
  isOpen: boolean
}
export const CustomerDetailModal: FC<CustomerDetailModalProps> = ({ customerInfo, onClose, isOpen }) => {
  return (
    <dialog
      open={isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <article>
        {customerInfo ? <CustomerDetailModalContent {...customerInfo} /> : <EmptyCustomerDetailModalContent />}
      </article>
    </dialog>
  )
}
const EmptyCustomerDetailModalContent = () => {
  return <div>고객을 선택해주세요.</div>
}

const CustomerDetailModalContent: FC<SimpleCustomerInfo> = ({ id, name }) => {
  return (
    <div>
      <h2>{`${name}님의 주문내역`}</h2>
      <CustomerDetailCardList customerId={id} />
    </div>
  )
}
const CustomerDetailCardList: FC<{ customerId: number }> = ({ customerId }) => {
  const { data, isLoading, isError } = useCustomerDetailQuery({ customerId })
  if (isLoading) {
    return <LoadingSkeleton />
  }
  if (isError) {
    return <div>에러가 발생했습니다.</div>
  }
  return (
    <div>
      {data.map((purchase) => (
        <CustomerDetailCard key={purchase.id} {...purchase}></CustomerDetailCard>
      ))}
    </div>
  )
}

const CustomerDetailCard: FC<CustomerDetailCardProps> = ({ date, price, product, imgSrc, quantityText }) => {
  return (
    <article>
      <div className={PICO_DATA.layout.classname.grid}>
        <img src={imgSrc} alt={product} />
        <div>
          <h3>제품: {product}</h3>
          <p>주문날짜: {date}</p>
          <p>가격: {price}</p>
          <p>구매수량: {quantityText}</p>
        </div>
      </div>
    </article>
  )
}
const useCustomerDetailQuery = (args: CustomerPurchaseListArgs) => {
  return useQuery({
    queryKey: ['customers', 'detail', args],
    queryFn: () => apis.customers.getPurchasesById(args),
    select: (data) => data.map(convertCustomerDetailCard),
  })
}

type CustomerDetailCardProps = {
  id: string
  date: string
  price: string
  imgSrc: string
  product: string
  quantityText: string
}
const convertCustomerDetailCard = (purchase: CustomerPurchaseDto): CustomerDetailCardProps => {
  return {
    product: purchase.product,
    id: `${purchase.product}-${purchase.date}`,
    date: new Date(purchase.date).toLocaleDateString(),
    price: `${purchase.price.toLocaleString()}원`,
    quantityText: `${purchase.quantity}개`,
    imgSrc: purchase.imgSrc,
  }
}
