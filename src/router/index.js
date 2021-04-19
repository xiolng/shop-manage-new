/**
 * 路由列表
 * {
 *  @param path: 路径,
 *  @param name: 路由名称,
 *  @param component: 模板,
 *  @param meta: 附加信息{
 *    name: 菜单名称,
 *    icon: 菜单图标,
 *    hideMenu: 是否隐藏菜单,
 *    activeUrl: 匹配选中菜单
 *  },
 * }
 */
const routes = [
  {
    path: '/',
    redirect: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MainLayout'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          name: '概况',
          icon: 'bar-chart',
          activeUrl: '/'
        }
      },
      {
        path: '/systemManage',
        component: () => import('@/views/SystemManage'),
        meta: {
          name: '系统管理',
          icon: 'setting',
          activeUrl: '/systemManage'
        },
        children: [
          {
            path: 'userManage',
            name: 'userManage',
            component: () => import('@/views/SystemManage/UserManage/UserManage'),
            meta: {
              name: '用户管理',
              icon: 'usergroup-add',
              activeUrl: '/systemManage/userManage'
            }
          },
          {
            path: 'roleManage',
            name: 'roleManage',
            component: () => import('@/views/SystemManage/RoleManage/RoleManage'),
            meta: {
              name: '角色管理',
              icon: 'cluster',
              searchKey: 'RoleManage',
              activeUrl: '/systemManage/roleManage'
            }
          },
          {
            path: 'MenuManage',
            name: 'MenuManage',
            component: () => import('@/views/SystemManage/MenuManage/MenuManage'),
            meta: {
              name: '菜单管理',
              icon: 'bars',
              activeUrl: '/systemManage/MenuManage'
            }
          },
          {
            path: 'operation',
            name: 'operation',
            component: () => import('@/views/SystemManage/OperationLog'),
            meta: {
              name: '操作日志',
              icon: 'file-word',
              theme: true,
              activeUrl: '/systemManage/operation'
            }
          },
        ]
      },
      {
        path: `/tenantManage`,
        name: 'tenantManage',
        component: () => import('@/views/TenantManage'),
        meta: {
          name: '租户',
          icon: 'menu',
          activeUrl: '/tenantManage'
        },
        children: [
          {
            path: 'list',
            name: 'tenantManageList',
            component: () => import('@/views/TenantManage/TenantManage'),
            meta: {
              name: '租户管理',
              activeUrl: '/tenantManage/list'
            }
          },
          {
            path: 'rechargeLog',
            name: 'rechargeLog',
            component: () => import('@/views/TenantManage/RechargeLog'),
            meta: {
              name: '充值列表',
              activeUrl: '/tenantManage/list'
            }
          },
        ]
      },
      {
        path: `/systemIdea`,
        name: 'systemIdea',
        component: () => import('@/views/SystemIdea'),
        meta: {
          name: '系统反馈',
          icon: 'menu',
          activeUrl: '/systemIdea'
        },
        children: [
          {
            path: 'list',
            name: 'systemIdeaList',
            component: () => import('@/views/SystemIdea/SystemIdea'),
            meta: {
              name: '反馈管理',
              activeUrl: '/systemIdea/list'
            }
          },
          {
            path: 'ideaDetail',
            name: 'ideaDetail',
            component: () => import('@/views/SystemIdea/SystemIdeaDetail'),
            meta: {
              name: '反馈详情',
              activeUrl: '/systemIdea/list'
            }
          },
        ]
      }
    ]
  },
  {
    path: '/signin',
    component: () => import('@/views/Login'),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('@/views/Login/Login'),
        activeUrl: '/signin'
      }
    ]
  },
  {
    path: '/403',
    name: 'noAccess',
    component: () => import('@/views/noAccess')
  },
  {
    path: '*',
    name: 'noPage',
    component: () => import('@/views/noPage')
  }
]

export default routes
