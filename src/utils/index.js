/**
 * 组合成树结构
 * @param data
 * @returns {[]}
 */
export const treeList = data => {
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    item.title = item.categoryName
    item.value = item.goodsCategoryId
    item.key = item.goodsCategoryId
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    map[item.goodsCategoryId] = item
  })
  data.forEach(item => {
    const parent = map[item.parentId]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
      parent.children.sort((a, b) => a.sort - b.sort)
    } else {
      result.push(item)
      result.sort((a, b) => a.sort - b.sort)
    }
  })
  return result
}

/**
 * 手机号验证
 * @param phone
 * @returns {boolean}
 */
export const validPhone = (phone) => {
  const isPhone = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[35678][0-9]{8})$/
  return isPhone.test(phone)
}

// 防抖动
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  // eslint-disable-next-line no-shadow
  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
