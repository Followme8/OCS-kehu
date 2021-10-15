import { constantRoutes, asyncRoutes } from "@/router/router";
import { cloneDeep } from "lodash";

//  得到相应权限的路由
export function getRoutesByGroupId(routes, groupId, Manager) {
  if (!groupId) {
    return routes;
  }
  return routes.filter(it => {
    if (it.allowAll || (it.path === "/xi-tong" && Manager === "0")) {
      return true;
    }
    if (it.group_id !== groupId) { // 1,2,3,4
      return false;
    }
    if (groupId.split(",").map(it => +it).includes(it.group_id)) {
      return true;
    }
    if (it.children && it.children.length > 0) {
      it.children = getRoutesByGroupId(it.children, groupId);
    }
    return true;
  });
}
const state = {
  routes: []
};

const mutations = {
  CHANGE_ROUTES: (state, routes) => {
    state.routes = routes;
  }
};

const actions = {
  compareRoutes({ commit, state }, {
    group_id,
    Manager
  }) {
    const clonseRoutes = cloneDeep(asyncRoutes);
    const accessRoutes = getRoutesByGroupId(clonseRoutes, group_id, Manager);
    const allRoutes = constantRoutes.concat(accessRoutes)
    commit("CHANGE_ROUTES", allRoutes)
    return accessRoutes;
  },
  resetRoutes({ commit }) {
    commit("CHANGE_ROUTES", []);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
