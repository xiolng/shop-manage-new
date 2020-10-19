import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const storePageApi = data => Http.post(
  `${BASE_URL}/shop/page`,
  data
)
// 查询所有
export const storeGetlistApi = params => Http.get(
  `${BASE_URL}/shop/getlist`,
  { params }
)
// 模糊查询
export const storeGetIdNamesApi = data => Http.post(
  `${BASE_URL}/shop/getIdNames`,
  data
)
// 通过号池表主键查询店铺名称
export const storeGetShopNameTimesApi = data => Http.post(
  `${BASE_URL}/shop/getShopNameTimes`,
  data
)
// 详情
export const storeGetByIdApi = params => Http.get(
  `${BASE_URL}/shop/getById`,
  { params }
)
// 新建
export const storeSaveApi = data => Http.post(
  `${BASE_URL}/shop/save`,
  data
)
// 编辑
export const storeUpdateByIdApi = data => Http.post(
  `${BASE_URL}/shop/updateById`,
  data
)
// 删除
export const storeLogicRemoveByIdApi = params => Http.get(
  `${BASE_URL}/shop/logicRemoveById`,
  { params }
)
