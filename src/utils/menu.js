/**
 * 菜单平级，组合成树结构
 * @param data
 * @returns {[]}
 */
export const treeMenu = (data, id) => {
  console.log(222, id, data)
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    map[item[id]] = item
  })
  data.forEach(item => {
    item.key = item[id]
    item.value = item[id]
    item.title = item.menuName
    const parentId = map[item.parentId]
    if (parentId) {
      (parentId.children || (parentId.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  console.log(result, 111)
  return result
}
/**
 * 菜单管理，根级目录 操作按钮 render渲染法
 * @param h 标签
 * @param root 数据根结构
 * @param node 节点
 * @param data 当前数据
 * @returns {*}
 */
export const rootFun = function (h, { root, node, data }) {
  const vm = this
  // root 根级目录
  return h('span', {
    style: {
      display: 'inline-block',
      width: '100%'
    }
  }, [
    h('span', {
      style: {
        marginRight: '20px'
      }
    }, data.title),
    h('Tooltip', {
      props: {
        content: '添加一级菜单',
        placement: 'top'
      },
    }, [
      h('a-icon', {
        props: {
          type: 'plus',
          size: 18
        },
        on: {
          click () {
            vm.showModal = !vm.showModal
            vm.showAdd = !vm.showAdd
            vm.menuData = {
              data: {
                menuId: '0',
                systemMenuId: '0',
                title: 'root'
              }
            }
          }
        }
      })
    ])
  ])
}
/**
 * 菜单管理，树结构菜单，操作按钮 render方法
 * @param h
 * @param root
 * @param node
 * @param data
 * @returns {boolean|*}
 */
export const renderContent = function (h, { root, node, data }) {
  const vm = this
  return h('span', {
    style: {
      display: 'inline-block',
      width: '100%',
      paddingBottom: '4px',
      borderBottom: '1px solid #eee'
    },
  }, [
    h('Row', {
      props: {
        type: 'flex',
        gutter: 10,
        justify: 'space-between'
      }
    }, [
      h('Col', {
        props: {
          span: '18'
        },
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }, [
        h('span', {
          style: {
            lineHeight: '24px',
            width: '100%',
            cursor: 'pointer',
            display: 'inline-block',
            background: '#fdfdfd'
          },
          on: {
            click: () => {
              this.$set(data, 'expand', !data.expand)
            }
          }
        }, [
          h('span', {
            style: {
              fontSize: 20,
              marginRight: '20px'
            }
          }, [
            h('a-icon', {
              props: {
                type: data.icon,
                color: '#ccc'
              }
            }),
            h('span', {
              style: {
                display: 'inline-block',
                margin: '0 10px'
              }
            }, data.title),
            h('span', {
              style: {
                color: '#ccc',
                fontSize: '12px'
              }
            }, `地址： ${data.menuUrl}`)
          ])
        ]),
      ]),
      h('Col', [
        h('Row', {
          props: {
            type: 'flex',
            gutter: 10
          }
        }, [
          h('Col', [
            h('Tooltip', {
              props: {
                content: '编辑',
                placement: 'top'
              },
              style: {
                cursor: 'pointer'
              }
            }, [
              h('a-icon', {
                props: {
                  type: 'edit',
                  theme: 'filled',
                },
                style: {
                  fontSize: '16px',
                  verticalAlign: 'bottom'
                },
                on: {
                  click () {
                    const parentKey = root.find(el => el === node).parent
                    const parentId = root.find(el => el.nodeKey === parentKey).node
                    const editData = data.menuId ? { menuId: data.menuId } : { systemMenuId: data.systemMenuId }
                    vm.menuData = {
                      ...editData,
                      parentId
                    }
                    vm.showModal = !vm.showModal
                    vm.showEdit = !vm.EditMenu
                  }
                }
              })
            ])
          ]),
          h('Col', [
            h('Tooltip', {
              props: {
                content: '添加',
                placement: 'top'
              },
              style: {
                cursor: 'pointer',
                // visibility: (!data.children && +data.parentId !== 0) ? 'hidden' : 'initial'
              }
            }, [
              h('a-icon', {
                props: {
                  type: 'plus-square',
                  theme: 'filled',
                  disabled: (!data.children && +data.parentId !== 0)
                },
                style: {
                  fontSize: '16px',
                  verticalAlign: 'bottom'
                },
                on: {
                  click () {
                    console.log('data', data, 'root', root, 'node', node)
                    const parentKey = root.find(el => el === node).parent
                    const parentId = root.find(el => el.nodeKey === parentKey).node
                    vm.menuData = {
                      data,
                      parentId
                    }
                    vm.showModal = !vm.showModal
                    vm.showAdd = !vm.showAdd
                  }
                }
              })
            ])
          ]),
          h('Col', [
            h('Tooltip', {
              props: {
                content: '删除',
                placement: 'top'
              },
              style: {
                cursor: 'pointer'
              }
            }, [
              h('a-icon', {
                props: {
                  type: 'delete',
                  theme: 'filled',
                },
                style: {
                  fontSize: '16px',
                  verticalAlign: 'bottom'
                },
                on: {
                  click () {
                    if (data.children && data.children.length >= 1) {
                      vm.$message.error('请先删除子级菜单')
                      return false
                    }
                    vm.removeRole(data)
                  }
                }
              })
            ])
          ]),
        ])
      ]),
    ])
  ])
}
