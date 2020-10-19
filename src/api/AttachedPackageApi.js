import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const AttachedPackagePageApi = data => Http.post(
  `${BASE_URL}/affiliatePackage/page`,
  data
)
// 查询所有
export const AttachedPackageGetlistApi = params => Http.get(
  `${BASE_URL}/affiliatePackage/getlist`,
  { params }
)
// 模糊查询搜索
export const AttachedPackageGetTeleIdNamesApi = data => Http.post(
  `${BASE_URL}/affiliatePackage/getTeleIdNames`,
  data
)
// 详情
export const AttachedPackageGetByIdApi = params => Http.get(
  `${BASE_URL}/affiliatePackage/getById`,
  { params }
)
// 新建
export const AttachedPackageSaveApi = data => Http.post(
  `${BASE_URL}/affiliatePackage/save`,
  data
)
// 编辑
export const AttachedPackageUpdateByIdApi = data => Http.post(
  `${BASE_URL}/affiliatePackage/updateById`,
  data
)
// 删除
export const AttachedPackageLogicRemoveByIdApi = params => Http.get(
  `${BASE_URL}/affiliatePackage/logicRemoveById`,
  { params }
)
