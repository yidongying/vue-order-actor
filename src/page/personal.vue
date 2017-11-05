
<template>
    <div class="box">
        <div class="personal-info" v-for="info in personal_info">
            <img :src="info.headImgUrl" alt="" class="header-image">
            <div class="personal_name" v-text="info.username"></div>
            <div class="personal_phone"><span class="phone-icon"></span>{{info.phone}}</div>
        </div>
        <div class="personal_comment">
            <div class="mycomment">我的评价</div>
            <mycomment :comments="comments"/>
        </div>
    </div>
</template>
<script>

  import mycomment from "../components/mycomment.vue"
    export default{
      components:{mycomment},
      data(){
          return {
                 personal_info:[
                    // {img:'../../../../static/images/star/star1.jpg',personal_name:"xuxiabin666",personal_phone:"131-11234667"},
                ],
                comments:[
                    {
                        img:'../../../static/images/star/star1.jpg',
                        name:'秦婷婷',
                        time:'08-01  03:08',
                        dec:"我觉得还可以",
                        server:'尚辰量贩KTV·唱歌两小时服务'
                    },
                    {
                        img:'../../../static/images/star/star1.jpg',
                        name:'秦婷婷',
                        time:'08-01  03:08',
                        dec:"我觉得还可以",
                        server:'尚辰量贩KTV·唱歌两小时服务'
                    }
                ],
                actorId:1
          }
      },
      created(){
         this.getData();
      },
      methods:{
        getData(){
            //获取用户个人信息
            this.$ajax({
                url:this.$store.state.url+'api/user/findmy',
                method:'get',
                params:{
                    actorId:this.actorId
                }
            }).then(res=>{
                console.log(res.data);
                if(res.status==200){
                    this.personal_info=res.data.parms.user;
                    // this.comments=res.data.comemnts;
                }
            },err=>{console.log(err);})
        }
      }
    }
</script>
<style>
    .personal-info{margin:0 auto;text-align: center;margin-top:0.2rem;border-bottom:0.25rem solid #e9e9e9;padding-bottom:0.25rem}
    .header-image{ height:1.6rem;width:1.6rem; border-radius: 0.8rem;background:#000;vertical-align: middle;margin-right: 0.1rem;}
    .personal_name{color:#393939;font-size:0.35rem;}
    .personal_phone{color:#656565;font-size:0.32rem;}
    .phone-icon{display:inline-block;width:0.25rem;height:0.25rem; background:url(../../static/images/personal/phone.png);background-size:100%;}

    .mycomment{color:#393939;font-size:0.32rem;height:1rem;line-height:1rem;text-indent:0.2rem;border-bottom:1px solid #ccc;}
</style>
//  "user": {
//       "ID": 1,
//       "username": "username",
//       "password": null,
//       "openId": null,
//       "unionId": null,
//       "nickname": "user0",
//       "phone": "13286968986",
//       "headImgUrl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1225775914,2507975769&fm=27&gp=0.jpg",
//       "city": "city",
//       "country": "country",
//       "province": "province",
//       "sex": 0,
//       "code": null,
//       "locked": false,
//       "id": 1
//     }
