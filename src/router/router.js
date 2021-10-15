import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";
import { beforeEach, afterEach } from "./config";

Vue.use(Router);

/**
 * 默认
 */
export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "首页", icon: "home", affix: true }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("@/views/login/index"),
    meta: { title: "登录" }
  },

  {
    path: "/404",
    hidden: true,
    component: () => import("@/views/error-page/404"),
    meta: { title: "404", noCache: true }
  }
];

/**
 * 根据用户权限
 *
 */
export const asyncRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/place-anOrder",
    component: Layout,
    name: "place-anOrder",
    allowAll: true,
    alwaysShow: true,
    meta: {
      title: "下单",
      icon: "users"
    },
    children: [
      {
        path: "waybll-list",
        component: () => import("@/views/place-anOrder/waybll-list"),
        name: "waybll-list",
        meta: { title: "运单列表", noCache: true }
      },
      {
        path: "generate-waybill",
        component: () => import("@/views/place-anOrder/generate-waybill"),
        name: "generate-waybill",
        meta: { title: "生成运单", noCache: true }
      },
      {
        path: "commodityIn-formation",
        component: () => import("@/views/place-anOrder/commodityIn-formation"),
        name: "commodityIn-formation",
        meta: { title: "商品信息管理", noCache: true }
      },
      {
        path: "importer",
        component: () => import("@/views/place-anOrder/importer"),
        name: "importer",
        meta: { title: "收件地址/进口商", noCache: true }
      },
      {
        path: "sending-address",
        component: () => import("@/views/place-anOrder/sending-address"),
        name: "sending-address",
        meta: { title: "发件地址", noCache: true }
      }
    ]
  },
  {
    path: "/xi-tong",
    component: Layout,
    name: "MessagePage",
    alwaysShow: true,
    meta: {
      title: "系统管理",
      icon: "message"
    },
    children: [
      {
        path: "account-generation",
        component: () => import("@/views/xi-tong/account-generation"),
        name: "accountGeneration",
        meta: { title: "子账户管理", noCache: true }
      }
    ]
  },
  {
    path: "*",
    hidden: true,
    allowAll: true,
    redirect: "/404"
  }
];

const router = new Router({
  routes: constantRoutes
});

router.beforeEach(beforeEach);

router.afterEach(afterEach);

export const ressetRouter = (routes) => {
  router.matcher = new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  }).matcher

  console.log(router, "router")
}

export default router;
