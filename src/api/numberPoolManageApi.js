import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const PoolPageApi = data => Http.post(
  `${BASE_URL}/numPool/page`,
  data
)
// 查询所有
export const PoolGetlistApi = params => Http.get(
  `${BASE_URL}/numPool/getlist`,
  { params }
)
// 查询id、名称
export const PoolGetTeleIdNamesApi = data => Http.post(
  `${BASE_URL}/numPool/getTeleIdNames`,
  data
)
// 详情
export const PoolGetByIdApi = params => Http.get(
  `${BASE_URL}/numPool/getById`,
  { params }
)
// 新建
export const PoolSaveApi = data => Http.post(
  `${BASE_URL}/numPool/save`,
  data
)
// 编辑
export const PoolUpdateByIdApi = data => Http.post(
  `${BASE_URL}/numPool/updateById`,
  data
)
// 删除
export const PoolLogicRemoveByIdApi = params => Http.get(
  `${BASE_URL}/numPool/logicRemoveById`,
  { params }
)
