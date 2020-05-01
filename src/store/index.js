import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations: {
    addCart(state,payload){
      const former = state.cartList.find(item=>item.iid===payload.obj.iid);
      if(former && payload.flag){
        former.num++;
      }else if(former && !payload.flag){
        former.num = former.num>1 ? former.num-1:former.num;
      } else{
        state.cartList.push(payload.obj);
      }
    },
    controlAll(state,flag){
      state.cartList.forEach(item=>{
        item.checked = flag;
      })
    },
    reverseChecked(state,obj){
      obj.checked = !obj.checked;
    }
  },
  actions: {
  },
  modules: {
  }
})
