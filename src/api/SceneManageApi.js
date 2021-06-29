/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const scenePageApi = data => Http.post(
  `${BASE_URL}/business/scene/scenePage`,
  data
)
// 保存
export const saveSceneApi = data => Http.post(
  `${BASE_URL}/business/scene/saveScene`,
  data
)
// 更新
export const updateSceneApi = data => Http.post(
  `${BASE_URL}/business/scene/updateScene`,
  data
)
// 详情
export const getSceneApi = params => Http.get(
  `${BASE_URL}/business/scene/getScene`,
  { params }
)
// 删除
export const deleteSceneApi = params => Http.get(
  `${BASE_URL}/business/scene/deleteScene`,
  { params }
)
