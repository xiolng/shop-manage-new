import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const BannerPageApi = data => Http.post(
  `${BASE_URL}/rotationImage/page`,
  data
)
// 查询所有id/name
export const BannerGetlistIdNameApi = data => Http.post(
  `${BASE_URL}/mobilePackage/getlistIdName`,
  data
)
// 详情
export const BannerGetByIdApi = params => Http.get(
  `${BASE_URL}/rotationImage/getById`,
  { params }
)
// 新建
export const BannerSaveApi = data => Http.post(
  `${BASE_URL}/rotationImage/save`,
  data
)
// 编辑
export const BannerUpdateByIdApi = data => Http.post(
  `${BASE_URL}/rotationImage/updateById`,
  data
)
// 是否启用
export const BannerChangeOrderApi = data => Http.post(
  `${BASE_URL}/rotationImage/changeImageOrder`,
  data
)
// 删除
export const BannerLogicRemoveByIdApi = params => Http.get(
  `${BASE_URL}/rotationImage/removeById`,
  { params }
)
