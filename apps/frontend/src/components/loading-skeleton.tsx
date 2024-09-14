import { FC } from 'react'

type LoadingSkeletonProps = {
  minHeight?: string
}
const DEFAULT_MIN_HEIGHT = '500px'
export const LoadingSkeleton: FC<LoadingSkeletonProps> = ({ minHeight }) => {
  return <article style={{ minHeight: minHeight ?? DEFAULT_MIN_HEIGHT }} aria-busy="true"></article>
}
