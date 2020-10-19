import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const ComboPageApi = data => Http.post(
  `${BASE_URL}/mobilePackage/page`,
  data
)
// 查询所有
export const ComboGetlistApi = params => Http.get(
  `${BASE_URL}/mobilePackage/getlist`,
  { params }
)
// 查询所有id/name
export const ComboGetlistIdNameApi = data => Http.post(
  `${BASE_URL}/mobilePackage/getlistIdName`,
  data
)
// 详情
export const ComboGetByIdApi = params => Http.get(
  `${BASE_URL}/mobilePackage/getById`,
  { params }
)
// 新建
export const comboSaveApi = data => Http.post(
  `${BASE_URL}/mobilePackage/save`,
  data
)
// 编辑
export const ComboUpdateByIdApi = data => Http.post(
  `${BASE_URL}/mobilePackage/updateById`,
  data
)
// 是否启用
export const ComboUpdateIsUseApi = data => Http.post(
  `${BASE_URL}/mobilePackage/updateIsUse`,
  data
)
// 修改审核状态
export const updateAuditSApi = data => Http.post(
  `${BASE_URL}/mobilePackage/updateAuditS`,
  data
)
// 删除
export const ComboLogicRemoveByIdApi = params => Http.get(
  `${BASE_URL}/mobilePackage/logicRemoveById`,
  { params }
)
