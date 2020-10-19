import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const channelPageApi = data => Http.post(
  `${BASE_URL}/channel/page`,
  data
)
// 查询所有
export const channelGetlistApi = params => Http.get(
  `${BASE_URL}/channel/getlist`,
  { params }
)
// 查询所有id/name
export const channelGetTeleIdNumsApi = data => Http.post(
  `${BASE_URL}/channel/getTeleIdNums`,
  data
)
// 详情
export const channelGetByIdApi = params => Http.get(
  `${BASE_URL}/channel/getById`,
  { params }
)
// 新建
export const channelSaveApi = data => Http.post(
  `${BASE_URL}/channel/save`,
  data
)
// 编辑
export const channelUpdateByIdApi = data => Http.post(
  `${BASE_URL}/channel/updateById`,
  data
)
// 删除
export const channelLogicRemoveByIdApi = params => Http.get(
  `${BASE_URL}/channel/removeById`,
  { params }
)
