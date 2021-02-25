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
  `${BASE_URL}/tenant/pageTenant`,
  data
)
// 全部列表
export const tenantAllListlApi = params => Http.get(
  `${BASE_URL}/tenant/getlist`,
  { params }
)
// 详情
export const tenanteDetailApi = params => Http.get(
  `${BASE_URL}/tenant/getTenantById`,
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
  `${BASE_URL}/tenant/deleteTentant`,
  { params }
)

// 启用
export const tenantEnableApi = params => Http.get(
  `${BASE_URL}/tenant/enableTenant`,
  { params }
)

// 禁用
export const tenantDisableApi = params => Http.get(
  `${BASE_URL}/tenant/disableTenant`,
  { params }
)

// 充值记录
export const rechargeLogApi = params => Http.get(
  `${BASE_URL}/tenant/getRechargeRecordById`,
  { params }
)

// 充值
export const rechargeApi = data => Http.post(
  `${BASE_URL}/tenant/rechargeTenant`,
  data
)

// 分页查询租户服务列表
export const pageTenantSystemServiceApi = data => Http.post(
  `${BASE_URL}/tenantSystemService/pageTenantSystemService`,
  data
)
// 开通服务
export const savePaySettingApi = data => Http.post(
  `${BASE_URL}/tenant/savePaySettings`,
  data
)
// 查询支付配置
export const paySettingApi = params => Http.get(
  `${BASE_URL}/tenant/getPaySettingsById`,
  { params }
)

// 租户启用服务
export const enableTenantSystemServiceApi = params => Http.get(
  `${BASE_URL}/tenantSystemService/enableTenantSystemService`,
  { params }
)

// 租户禁用服务
export const disableTenantSystemServiceApi = params => Http.get(
  `${BASE_URL}/tenantSystemService/disableTenantSystemService`,
  { params }
)
