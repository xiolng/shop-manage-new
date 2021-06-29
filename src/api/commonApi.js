import Http from '@/api/Http'

const BASE_URL = '/api'
// 上传图片
export const uploadImgApi = data => Http({
  url: `${BASE_URL}/file/upload`,
  data,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
// 删除图片
export const deleteImgApi = data => Http({
  url: `${BASE_URL}/business/fileManage/removeOneFile`,
  data,
  method: 'post'
})
// 上传多张图片
export const uploadAllImgApi = data => Http({
  url: `${BASE_URL}/business/fileManage/saveMoreFile`,
  data,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// 删除多张图片
export const deleteAllImgApi = data => Http({
  url: `${BASE_URL}/business/fileManage/removeMoreFile`,
  data,
  method: 'post'
})
