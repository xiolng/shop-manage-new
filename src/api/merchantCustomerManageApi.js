import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const merchantPageApi = data => Http.post(
  `${BASE_URL}/customerManager/pageSuccess`,
  data
)
// 启用状态
export const merchantUpdateStatusApi = data => Http.post(
  `${BASE_URL}/customerManager/updateStatus`,
  data
)
// 审核列表
export const merchantPageAuditApi = data => Http.post(
  `${BASE_URL}/customerManager/pageAudit`,
  data
)
// 审核详情
export const merchantGetAuditByIdApi = params => Http.get(
  `${BASE_URL}/customerManager/getAuditById`,
  { params }
)
// 客户经理id / name
export const merchantGetlistApi = data => Http.post(
  `${BASE_URL}/customerManager/getlist`,
  data
)
// 修改审核状态
export const merchantUpdateAuditApi = data => Http.post(
  `${BASE_URL}/customerManager/updateAudit`,
  data
)
// 客户经理详情
export const merchantGetSuccessByIdApi = params => Http.get(
  `${BASE_URL}/customerManager/getSuccessById`,
  { params }
)
// 查询未关联的商户
export const merchantnotRelevancePageApi = data => Http.post(
  `${BASE_URL}/customerManager/notRelevancePage`,
  data
)
// 客户经理关联渠道保存修改
export const merchantrelevanceChannelApi = data => Http.post(
  `${BASE_URL}/customerManager/relevanceChannel`,
  data
)
// 客户经理关联套餐保存修改
export const merchantrelevanceMobilePApi = data => Http.post(
  `${BASE_URL}/customerManager/relevanceMobileP`,
  data
)
// 客户经理关联店铺保存修改
export const merchantrelevanceShopApi = data => Http.post(
  `${BASE_URL}/customerManager/relevanceShop`,
  data
)
