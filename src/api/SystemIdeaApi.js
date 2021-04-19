/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = `business`
// 获取列表
export const pageSystemIdeaApi = data => Http.post(
  `${BASE_URL}/systemIdea/pageSystemIdea`,
  data
)
// 详情
export const getSystemIdeaByIdApi = params => Http.get(
  `${BASE_URL}/systemIdea/getSystemIdeaById`,
  { params }
)
// 删除
export const deleteSystemIdeaByIdApi = params => Http.get(
  `${BASE_URL}/systemIdea/deleteSystemIdeaById`,
  { params }
)
