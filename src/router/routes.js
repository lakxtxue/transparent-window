const files = require.context("./modules", false, /\.js$/);
const routers = [];

files.keys().forEach(key => {
  let rt = files(key).default;
  if (rt instanceof Array) {
    routers.push(...rt);
  } else {
    routers.push(rt);
  }
});

const _import = file => {
  return () => {
    return import("@/views/" + file);
  };
};

/**
 * 在主框架内显示
 */
const frameIn = [
  // 页面重定向 必须保留
  {
    path: "/redirect",
    component: () => import("@/layout"),
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/",
    redirect: { name: "index" },
    meta: { requireAuth: true },
    component: () => import("@/layout"),
    children: [
      // 首页 必须 name:index
      {
        path: "index",
        name: "index",
        meta: { requireAuth: true },
        component: _import("Home")
      },
      // 刷新页面 必须保留
      {
        path: "refresh",
        name: "refresh",
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next(vm => vm.$router.replace(from.fullPath));
          },
          render: h => h()
        }
      }
    ]
  },
  ...routers
];

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: "*",
    name: "404",
    component: () => import("@/views/errorPage/404")
  }
];

// 重新组织后导出
export default [...frameIn, ...errorPage];
