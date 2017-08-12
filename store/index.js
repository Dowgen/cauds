/* 测试失败，此文件作废 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    localData: {}
  },
  mutations: {
    changeData (state, data) {
      state.localData = { ...data }
      console.warn('userInfo:'+ state.localData.userInfo);
    }
  }
})

export default store