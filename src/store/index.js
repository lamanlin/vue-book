import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

let state = { 
  //每次刷新后，购物车的数据都被清空了,保存到Localstorage中。默认为
  cartList: localStorage["cartList"] ? JSON.parse(localStorage["cartList"]) : []
};
import getters from './getters'
import mutations from './mutations'
export default new Vuex.Store({
  state,
  getters,
  mutations,
})
