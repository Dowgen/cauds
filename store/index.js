/* vuex不支持多页面，此文件作废 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    mode: 0, //登录用户，0表资金方，1表资产方
    accountData: {} //登录账户的信息
  },
  mutations: {
    changeMode (state, mode) {
      state.mode = mode
      console.warn('mode:'+ state.mode);
    },
    changeData (state, data) {
      state.accountData = { ...data }
      console.warn('userInfo:'+ JSON.stringify(state.accountData));
    }
  }
})

export default store