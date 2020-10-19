/**
 * @author: xiolng
 * @file SystemServiceApi
 * @date 2020/10/15
 * @time 15:28
 */
import Http from '@/api/Http'

const BASE_URL = `/system`
// 获取列表
export const SystemServiceListApi = data => Http.post(
  `${BASE_URL}/systemService/systemServicePage`,
  data
)
// 全部列表
export const SystemServiceAllListlApi = params => Http.get(
  `${BASE_URL}/systemService/systemServiceList`,
  { params }
)
// 详情
export const SystemServiceeDetailApi = params => Http.get(
  `${BASE_URL}/systemService/getSystemServiceById`,
  { params }
)
// 新建
export const SystemServiceAddApi = data => Http.post(
  `${BASE_URL}/systemService/saveSystemService`,
  data
)
// 编辑
export const SystemServiceEditApi = data => Http.post(
  `${BASE_URL}/systemService/updateSystemService`,
  data
)
// 删除
export const SystemServiceDeleteApi = params => Http.get(
  `${BASE_URL}/systemService/deleteSystemService`,
  { params }
)

// 导入用户
export const importUserApi = data => Http.request({
  url: `/system/questionUser/importUser`,
  data,
  method: 'post',
  processData: false,
})
// 导出模板
export const exportUserApi = data => Http.request({
  url: `/system/questionUser/downloadTemplate`,
  data,
  method: 'get',
  responseType: 'blob'
})
