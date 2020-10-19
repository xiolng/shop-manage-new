import Http from '@/api/Http'

const BASE_URL = `/system`
// 获取列表
export const roleListApi = data => Http.post(
  `${BASE_URL}/role/rolePage`,
  data
)
// 查询所有
export const roleAllListlApi = params => Http.get(
  `${BASE_URL}/role/roleList`,
  { params }
)
// 详情
export const roleeDetailApi = params => Http.get(
  `${BASE_URL}/role/getRoleById`,
  { params }
)
// 新建
export const roleAddApi = data => Http.post(
  `${BASE_URL}/role/saveRole`,
  data
)
// 编辑
export const roleEditApi = data => Http.post(
  `${BASE_URL}/role/updateRole`,
  data
)
// 删除
export const roleDeleteApi = params => Http.get(
  `${BASE_URL}/role/deleteRole`,
  { params }
)
