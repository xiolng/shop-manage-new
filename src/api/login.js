import Http from './Http'
// 设置二级地址
const BASE_URL = ``

export const setRegister = data => Http.post(`${BASE_URL}/auth/signup`, data) // 登录
export const setLogin = data => Http.post(`${BASE_URL}/auth/signin`, data) // 登录
export const setOutLogin = params => Http.get(`${BASE_URL}/auth/signout`, { params }) // 登出
export const getUserDetail = params => Http.get(`${BASE_URL}/system/user/userInfo`, { params }) // 获取用户详情
