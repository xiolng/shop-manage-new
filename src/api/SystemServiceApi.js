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
  `${BASE_URL}/systemService/pageSystemService`,
  data
)
// 全部列表
export const SystemServiceAllListlApi = params => Http.get(
  `${BASE_URL}/systemService/systemServiceList`,
  { params }
)
// 详情
export const SystemServiceeDetailApi = params => Http.get(
  `${BASE_URL}/systemService/getSystemService`,
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

// 服务折扣-获取列表
export const pageSystemServiceDiscountApi = data => Http.post(
  `${BASE_URL}/systemServiceDiscount/pageSystemServiceDiscount`,
  data
)
// 服务折扣-全部列表
export const listSystemServiceDiscountApi = params => Http.get(
  `${BASE_URL}/systemServiceDiscount/listSystemServiceDiscount`,
  { params }
)
// 服务折扣-详情
export const getSystemServiceDiscountApi = params => Http.get(
  `${BASE_URL}/systemServiceDiscount/getSystemServiceDiscount`,
  { params }
)
// 服务折扣-新建
export const saveSystemServiceDiscountApi = data => Http.post(
  `${BASE_URL}/systemServiceDiscount/saveSystemServiceDiscount`,
  data
)
// 服务折扣-编辑
export const updateSystemServiceDiscountApi = data => Http.post(
  `${BASE_URL}/systemServiceDiscount/updateSystemServiceDiscount`,
  data
)
// 服务折扣-删除
export const deleteSystemServiceDiscountApi = params => Http.get(
  `${BASE_URL}/systemServiceDiscount/deleteSystemServiceDiscount`,
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
