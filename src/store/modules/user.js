import api from "@/api/user";

import { getToken, setToken, removeToken } from "@/utils/atuh";
import { ressetRouter } from "@/router/router";

const userInfoStr = localStorage.getItem("userInfo");

const state = {
  token: getToken() || null,
  userInfo: userInfoStr ? JSON.parse(userInfoStr) : {}
};

// actions
const actions = {
  async login({ commit, dispatch }, loginForm) {
    const result = await api.login(loginForm);
    if (result.code === 1) {
      const { token } = result.data;
      setToken(token)
      commit("CAHNGE_TOKEN", token);
      await dispatch("getUserInfo", token);
    } else {
      return Promise.reject(new TypeError("账号或密码错误"));
    }
  },
  async getUserInfo({ commit }, token) {
    const result = await api.getUserInfo({ token });
    if (result.code === 1) {
      const info = result.data.userinfo;
      commit("CHANGE_USERINFO", info);
      // session.setAttribute("CHANGE_USERINFO", info)
      // localStorage.setItem("token", result.data.token)
      localStorage.setItem("userInfo", JSON.stringify(info));
    }
  },
  logout({ commit, dispatch }) {
    commit("CAHNGE_TOKEN", null);
    commit("CHANGE_USERINFO", {});
    dispatch("router/resetRoutes", undefined, { root: true })
    localStorage.removeItem("userInfo");
    ressetRouter();
    removeToken();
  }
};

// mutations
const mutations = {
  CAHNGE_TOKEN(state, token) {
    state.token = token;
  },
  CHANGE_GROUP_ID(state, group_id) {
    state.group_id = group_id;
  },
  CHANGE_MANAGER(state, manager) {
    state.manager = manager;
  },
  CHANGE_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
