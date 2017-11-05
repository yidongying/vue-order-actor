/**
 * Created by Administrator on 2017/4/12.
 */
import * as types from '../mutation';
import  api from '../../api/api';
const state={
    comm:{
        cId:''
    },
    infos:{

    }
}
const mutations={
    [types.INFO](state,res){
        state.infos=res;
    }
}
const getters={
    getINFOS:state=>state.infos
}
const actions={
    agetINFOS({commit},id){

        api.getProdectData(id,function(res){
            commit(types.INFO,{res})
        })
    }
}
export default  {
    state,
    actions,
    mutations,
    getters
}