import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const OrderPageApi = data => Http.post(
  `${BASE_URL}/order/page`,
  data
)
