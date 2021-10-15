import NProgress from "nprogress"; // progress bar
import store from "../store";
import { getToken } from "@/utils/atuh";
// import { Message } from "element-ui"
import router from "./router";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/404", "/401"];

export async function beforeEach (to, from, next) {
  // console.log("-----------------", to.path, getToken())
  // 启动进度条
  NProgress.start();
  if (to.meta.title !== undefined) {
    // 动态获取标题头
    document.title = to.meta.title;
  } else {
    document.title = "\u200E";
  }
  const token = getToken();
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwd2QiOiIxMjM0NTYiLCJpZCI6NH0.SVEoKhfk6yALfNtjVM1Y7YTioMUXqcqD1fRAaHz9eJ0";
  if (token) {
    if (to.path === "/login") {
      // 如果已经登录 不允许进入登录页
      next(false);
      return;
    }
    const { Manager, group_id } = store.getters.userInfo;
    if (Manager && group_id && store.getters.routes.length <= 0) {
      const accessRoutes = await store.dispatch("router/compareRoutes", {
        group_id,
        Manager
      });
      router.addRoutes(accessRoutes);
      try {
        next({ ...to, replace: true });
      } catch (error) {
        console.log(error)
      }
      return;
    }
    next();
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
}

export function afterEach(to, from) {
  NProgress.done();
}
