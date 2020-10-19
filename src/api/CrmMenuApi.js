import Http from '@/api/Http'

const BASE_URL = `/system`
// 获取列表
export const CrmMenuListApi = data => Http.post(
  `${BASE_URL}/systemMenu/menuList`,
  data
)
// 查询所有
export const CrmMenuAllListlApi = params => Http.get(
  `${BASE_URL}/systemMenu/systemMenuList`,
  { params }
)
// 登录查询菜单
export const CrmMenuLoginApi = params => Http.get(
  `${BASE_URL}/systemMenu/menuListByUser`,
  { params }
)
// 详情
export const CrmMenuDetailApi = params => Http.get(
  `${BASE_URL}/systemMenu/systemMenuById`,
  { params }
)
// 新建
export const CrmMenuAddApi = data => Http.post(
  `${BASE_URL}/systemMenu/saveSystemMenu`,
  data
)
// 编辑
export const CrmMenuEditApi = data => Http.post(
  `${BASE_URL}/systemMenu/updateSystemMenu`,
  data
)
// 删除
export const CrmMenuDeleteApi = params => Http.get(
  `${BASE_URL}/systemMenu/deleteSystemMenu`,
  { params }
)
// 系统菜单和服务绑定
export const CrmMenuBindApi = data => Http.post(
  `${BASE_URL}/systemMenu/sytemMenuBindingService`,
  data
)
