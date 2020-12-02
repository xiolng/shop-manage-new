import Http from '@/api/Http'

const BASE_URL = `/system`
// 获取列表
export const userListApi = data => Http.post(
  `${BASE_URL}/user/userPage`,
  data
)
// 全部列表
export const userAllListlApi = params => Http.get(
  `${BASE_URL}/user/getlist`,
  { params }
)
// 详情
export const usereDetailApi = params => Http.get(
  `${BASE_URL}/user/getUserById`,
  { params }
)
// 新建
export const userAddApi = data => Http.post(
  `${BASE_URL}/user/saveUser`,
  data
)
// 编辑
export const userEditApi = data => Http.post(
  `${BASE_URL}/user/updateUser`,
  data
)
// 删除
export const userDeleteApi = params => Http.get(
  `${BASE_URL}/user/deleteUserById`,
  { params }
)
// 重置密码
export const resetPasswordApi = data => Http.post(
  `${BASE_URL}/user/resetPassword`,
  data
)

// 导入用户
export const importUserApi = data => Http.request({
  url: `${BASE_URL}/questionUser/importUser`,
  data,
  method: 'post',
  processData: false,
})
// 导出模板
export const exportUserApi = data => Http.request({
  url: `${BASE_URL}/questionUser/downloadTemplate`,
  data,
  method: 'get',
  responseType: 'blob'
})
