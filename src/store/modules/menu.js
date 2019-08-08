// 设置文件
import * as Util from "@/utils";
export default {
  namespaced: true,
  state: {
    // 顶栏菜单
    header: [],
    // 侧栏菜单
    aside: []
  },
  actions: {
    SetHeaderMenu({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        let result = await Util.getHeaderData();
        state.header = result.data;
        // end
        resolve(state.header);
      });
    }
  },
  mutations: {
    /**
     * @description 设置顶栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    headerSet(state, menu) {
      // store 赋值
      state.header = menu;
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet(state, menu) {
      // store 赋值
      state.aside = menu;
    }
  }
};
