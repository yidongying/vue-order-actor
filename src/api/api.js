import axios from 'axios'
// 定义一个api接口
export default{
  indexGetList:function (cb) {

    axios.get('/index/getList').then(function (res) {
      //if(res.data.data.code ==1000){
      //  setTimeout(function () {
      //
      //  },300)
      //}
      cb(res.data.data.data);
    });

  },
  getProdectData:function(id,cb){
    axios.get('/prodect/getData',{
     ID:id
    }).then(function (res) {
      cb(res.data.data.data[0]);
    });
  }
}
