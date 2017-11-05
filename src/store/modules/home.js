import * as types from '../mutation';
import  api from '../../api/api';
const state={
  info:{}
}
const mutations={
  [types.HOME_LIST](state,res){
    state.info=res;
    console.log(state.info)
  }
}
const getters={
  getHomeIndex:state=>state.info
}
const actions={
  getHomeIndex({commit}){

    api.indexGetList(function(res){
      commit(types.HOME_LIST,{res})
    })
  }
}
export default  {
  state,
  actions,
  mutations,
  getters
}
