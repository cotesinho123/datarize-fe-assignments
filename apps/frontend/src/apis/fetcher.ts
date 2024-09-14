import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:4000'
const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const fetcher = axios.create(axiosConfig)

// TODO : 공통 에러 처리 로직 추가(시간 있으면)
