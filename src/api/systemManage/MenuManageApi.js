import Http from '@/api/Http'

const BASE_URL = `/system`
// 获取列表
export const menuListApi = data => Http.post(
  `${BASE_URL}/menu/menuList`,
  data
)
// 查询所有
export const menuAllListlApi = params => Http.get(
  `${BASE_URL}/menu/menuList`,
  { params }
)
// 登录查询菜单
export const menuLoginApi = params => Http.get(
  `${BASE_URL}/menu/menuListByUser`,
  { params }
)
// 详情
export const menueDetailApi = params => Http.get(
  `${BASE_URL}/menu/getMenuById`,
  { params }
)
// 新建
export const menuAddApi = data => Http.post(
  `${BASE_URL}/menu/saveMenu`,
  data
)
// 编辑
export const menuEditApi = data => Http.post(
  `${BASE_URL}/menu/updateMenu`,
  data
)
// 删除
export const menuDeleteApi = params => Http.get(
  `${BASE_URL}/menu/deleteMenu`,
  { params }
)
