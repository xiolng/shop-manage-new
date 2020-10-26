/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = `system`
// 获取列表
export const tenantListApi = data => Http.post(
  `${BASE_URL}/tenant/tenantPage`,
  data
)
// 全部列表
export const tenantAllListlApi = params => Http.get(
  `${BASE_URL}/tenant/getlist`,
  { params }
)
// 详情
export const tenanteDetailApi = params => Http.get(
  `${BASE_URL}/tenant/tenantById`,
  { params }
)
// 新建
export const tenantAddApi = data => Http.post(
  `${BASE_URL}/tenant/saveTenant`,
  data
)
// 编辑
export const tenantEditApi = data => Http.post(
  `${BASE_URL}/tenant/updateTenant`,
  data
)
// 删除
export const tenantDeleteApi = params => Http.get(
  `${BASE_URL}/tenant/deleteTenant`,
  { params }
)

// 导入用户
export const importUserApi = data => Http.request({
  url: `system/questionUser/importUser`,
  data,
  method: 'post',
  processData: false,
})
// 导出模板
export const exportUserApi = data => Http.request({
  url: `system/questionUser/downloadTemplate`,
  data,
  method: 'get',
  responseType: 'blob'
})
