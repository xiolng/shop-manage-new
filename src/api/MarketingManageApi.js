/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const marketingPageApi = data => Http.post(
  `${BASE_URL}/system/marketing/marketingPage`,
  data
)
// 保存
export const saveMarketingApi = data => Http.post(
  `${BASE_URL}/system/marketing/saveMarketing`,
  data
)
// 更新
export const updateMarketingApi = data => Http.post(
  `${BASE_URL}/system/marketing/updateMarketing`,
  data
)
// 详情
export const getSystemIdeaByIdApi = params => Http.get(
  `${BASE_URL}/systemIdea/getSystemIdeaById`,
  { params }
)
// 删除
// export const deleteSystemIdeaByIdApi = params => Http.get(
//   `${BASE_URL}/systemIdea/deleteSystemIdeaById`,
//   { params }
// )
// 查询营销信息列表
export const marketingListApi = params => Http.get(
  `${BASE_URL}/system/marketing/marketingList`,
  { params }
)
// 禁用
export const disableMarketingApi = params => Http.get(
  `${BASE_URL}/system/marketing/disableMarketing`,
  { params }
)

// 启用
export const enableMarketingApi = params => Http.get(
  `${BASE_URL}/system/marketing/enableMarketing`,
  { params }
)

// 查询营销信息
export const getMarketingApi = params => Http.get(
  `${BASE_URL}/system/marketing/getMarketing`,
  { params }
)

// 设置营销维护
export const maintainMarketingApi = params => Http.get(
  `${BASE_URL}/system/marketing/maintainMarketing`,
  { params }
)
