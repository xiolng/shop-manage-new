import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const ShopPageApi = data => Http.post(
  `${BASE_URL}/goods/page`,
  data
)
// 查询所有
export const ShopGetlistApi = params => Http.get(
  `${BASE_URL}/business/mobilePackage/getlist`,
  { params }
)
// 查询所有id/name
export const ShopGetlistIdNameApi = data => Http.post(
  `${BASE_URL}/goods/getlistIdName`,
  data
)
// 详情
export const ShopGetByIdApi = params => Http.get(
  `${BASE_URL}/goods/getById`,
  { params }
)
// 新建
export const ShopSaveApi = data => Http.post(
  `${BASE_URL}/goods/save`,
  data
)
// 编辑
export const ShopUpdateByIdApi = data => Http.post(
  `${BASE_URL}/goods/updateById`,
  data
)
// 上下架
export const ShopUpdateIsUpperApi = data => Http.post(
  `${BASE_URL}/goods/updateIsUpper`,
  data
)
// 修改审核状态
export const ShopUpdateOrderApi = data => Http.post(
  `${BASE_URL}/goods/updateOrder`,
  data
)
// 删除
export const ShopLogicRemoveByIdApi = params => Http.get(
  `${BASE_URL}/goods/logicRemoveById`,
  { params }
)
