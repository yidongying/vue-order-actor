var Mock = require('mockjs');

 Mock.mock(
    '/index/getList',
    {
        "data":{
            "code":"1000",
            "msg":"success",
            "data|10-11":[
                {
                    "name":"@cname",
                    "imgGrounp|1-9":["@image"],

                }
            ]
        },
    }
)
   //获取商品id接口

   .mock(
   '/prodect/getData',
   {
     "data":{
       "code":"1000",
       "msg":"success",
       "data":[
         {
           "name":"@cname",
           "tag|1-3":["标签1"],
           "userIcon":"@image",
           "title":"@ctitle",
           "imgGrounp|1-9":["@image"],
           "prodectId|+1":1,
           "detail":"@cparagraph"
         }
       ]
     }
   }
 )

export default Mock;
