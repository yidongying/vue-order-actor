<template>
   <div class="star-details">
        <div class="star-img-swipe">
               <img :src="star_details.headImgUrl" :alt="star_details.nickname">
        </div>
         <div class="star-img-small">
                <img :src="star_details.headImgUrl" :alt="star_details.nickname">
         </div>
        <div class="star-name-bardian">
                <div class="star-stagename" v-text="star_details.star_name"></div>
                <div class="star-bardian" v-text="star_details.star_bardian"></div>
        </div>
        <div  class="servers">
            <div class="star-server" v-text="star_details.remark"></div>
            <div class="star-price">￥<b>{{star_details.price}}</b>/次</div>
            <input type="button" value="点播Ta" @click="orderServer">
        </div>  
        <!-- 评论/打赏 -->
        <div class="call-comment server-callcomment">
            <a href="#" v-for="(item,index) in call_comment"><i :class="{active:curIndex==index}" v-text="item" @click="callCommentHandle(index)"></i></a>
         </div>  
         <div class="call-comment-wrap">
             <!-- 评论组件 -->
            <comment v-show="isComment" :comments="comments"/>
            <!-- 打赏组件 "-->
            <call v-show="!isComment" :callStar="callStar"/>
        </div>  
        <!-- 弹窗提示：页面跳转 -->
        <confirm v-model="confirmOrder" :content="'确定要支付 ￥'+star_details.price +'元 吗'"></confirm>
        
   </div>
</template>
<script> 
    import {Confirm} from "vux"  
    import comment from "../components/call_comment/commentpage.vue"
    import call from "../components/call_comment/callpage.vue" 
    export default {
        components:{call,comment,Confirm},
        data(){
            return {
                show:false,
                show1:false,
                curIndex:0,
                isComment:true,
                actorId:1,
                confirmOrder:false,
                call_comment:["评论","打赏"],
                callStar:[],
                comments:[ 
                    // {
                    //     img:'../../../static/images/star/star1.jpg',
                    //     name:'斯卡拉7a6',
                    //     time:'08-01  03:08',
                    //     dec:"我觉得还可以",
                    //     server:'尚辰量贩KTV·唱歌两小时服务'
                    //      score：5
                    // },
                    // {
                    //     img:'../../../static/images/star/star1.jpg',
                    //     name:'斯卡拉7a6',
                    //     time:'08-01  03:08',
                    //     dec:"我觉得还可以",
                    //     server:'尚辰量贩KTV·唱歌两小时服务'
                     //    score：5
                    // }
                ],
                pageConfig:{
                    size:3,
                    page:1,
                    maxSize:1
                },
                star_details:{
                    // bigImg:["../../../../../static/images/star/star1.jpg","../../../../../static/images/star/star3.jpg"],
                    // smallImg:"../../../../../static/images/star/star1.jpg",
                    // star_name:'李娜',
                    // star_bardian:'亮出最美的微笑，展示最美好的自己',
                    // star_server:'唱歌两小时跳舞一小时',
                    // star_price:'568'
                },
            }
        },
        created(){
            // console.log(this.$route.params.actorId);
            // this.actorId=this.$route.params.actorId;
            // 查看艺人自己的信息
            // this.$ajax({
            //     url:this.$store.state.url+'/api/actor/findmy',
            //     method:'get',
            //     headders:{
            //         Accept:"*/*",
            //         Token:localStorage.getItem("actorToken")
            //     }
            // }).then(res=>{
            //     console.log(res.data);
            //     if(res.status=200){
                    
            //     }
            // })
            //查看艺人的打赏订单  (获取信息为orders)?
            this.$ajax({
                url:this.$store.state.url+'/api/order/actorgu/'+this.actorId,
                method:'get',
                params:{size:this.pageConfig.size,page:this.pageConfig.page}
            }).then((res)=>{
                // console.log(res.data);
                if(res.status==200){
                    this.star_details=res.data.parms.orders[0].actor;
                    console.log(this.star_details);
                }
            });
            // 查询艺人的评论
            this.$ajax({
                url:this.$store.state.url+'/api/comment/finda/'+this.actorId,
                method:'get',
                params:{
                    actorId:this.actorId,
                    size:this.pageConfig.size,
                    page:this.pageConfig.page
                }
            }).then(res=>{
                 console.log(res.data);
                if(res.status==200){
                   this.comments=res.data.parms.comments;
                }
            },err=>{console.log(err)});
        },
        methods:{
            callCommentHandle(index){
                this.curIndex=index;
                if(this.curIndex==0){
                    this.isComment=true;
                }else
                    this.isComment=false;
            },
            orderServer(){
                this.confirmOrder=true;
                //用户下单(点播艺人)
                this.$ajax({
                    url:this.$store.state.url+'/api/order/user',
                    methods:'post',
                    data:{
                        buyId:'',//被购买的Id
                        actorId:this.atcorId,  //艺人Id，当前浏览页面的艺人ID
                        ktvId:'',   //ktvId:艺人所在KTV
                        type:0,
                        room:""
                    }
                }).then((res)=>{
                    console.log(res.data);
                    this.confirmOrder=true;
                })
            }
        }
    }
</script>
<style>
    .star-img-swipe{width:100%;height:3.5rem;}
    .star-img-swipe>img{width:100%;height:100%;}
    .star-img-small{width:100%;display:flex;justify-content:center;transform:translateY(-50%);}
    .star-img-small>img{width:1.6rem;height:1.6rem;border-radius:50%;}
    .star-name-bardian{width:100%;height:2.2rem;background: #fff;transform: translateY(-80%);z-index:-1;position:relative;text-align:center;}
    .star-name-bardian>.star-stagename{transform: translateY(150%);font-size:0.4rem;}
    .star-name-bardian>.star-bardian{transform: translateY(170%);font-size:0.32rem;color:#aaa;}

    /* 点播/服务 */
    .servers{border:10px solid #e9e9e9;transform: translateY(-1.76rem);height:3.6rem;text-align:center;}
    .star-server{transform:translateY(0.4rem);font-size:0.4rem;}
    .star-price{font-size:0.4rem;color:#766bde;transform: translateY(0.4rem)}
    .star-price>b{font-size:0.45rem;}
    .servers>input[type="button"]{color:#fff;height:0.8rem;width:5.6rem;font-size:0.4rem;background:#766bde;border-radius: 0.4rem;}

    /* 评论/打赏 */
    .server-callcomment{transform: translateY(-1.72rem);}
    .call-comment{display:flex;justify-content: center;border-bottom:1px solid #ccc;}
    .call-comment>a{display:inline-block;width:50%;text-align:center;font-size:0.32rem;line-height: 1rem;}
   /* call/comment当前活动组件样式 */
   .call-comment>a>i.active{display:inline-block;height:100%;border-bottom:3px solid #776bde;}

   .call-comment-wrap{transform: translateY(-1.7rem)}
</style>

