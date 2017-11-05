<template>
    <div class="comment">
        <div class="comment-list" v-for="comment in comments">
                <div class="comment-info">
                    <img :src="comment.img" alt="comment.icon" class="header-image comment-img">
                    <div class="star-name">评价了<b>{{comment.name}} </b>
                        <span class="star-five-small"></span>
                        <span class="star-five-small"></span>
                        <span class="star-five-small"></span>
                        <span class="star-five-small"></span>
                        <span class="star-five-small"></span>
                    </div>
                    <div class="comment-time" v-text="comment.time"></div>
                </div>
                <div class="comment-content">
                    <span class="comment-icon"></span>
                    <span class="comment-dec" v-text="comment.dec"></span>
                </div>
                <!-- 打赏/回复 isCallStar判断用户是否打赏，isRecommnet判断艺人是否回复信息-->
                <div class="call-present" v-show="isCallStar">
                    <i class="call-icons"></i>
                    <span>打赏了Ta</span><b >{{call_comment.call_present}}</b>一朵
                </div>
                <div class="re-comment" v-show="isRecommnet">
                    <div class="re-comment-content">Ta的回复：{{call_comment.re_commnet}}</div>
                </div>

                <!-- 具体服务 -->
                <div class="comment-server" v-text="comment.server"></div>
            </div>
    </div>
</template>
<script>
    export default{
        props:["comments"],
        data(){
            return {
                isCallStar:true,
                isRecommnet:true,
                call_comment:{
                     call_present:"玫瑰花",
                     re_commnet:"多谢大老板捧场"
                }
               
            }
        },
        created(){
            //获取艺人回评信息
            this.$ajax({
                url:this.$store.state+'/api/comment/actor',
                methods:'post',
                data:{
                    value:'',
                    orderId:''
                }
            }).then((res)=>{
                console.log(res.data);
                if(res.status==200){
                    this.call_comment.re_commnet=res.data.info;
                }
            })
        },
        methods:{

        }
    }
</script>
<style >
     /* 我的评价 */
    .comment-list{margin-top:0.2rem;padding-left:0.2rem;border-bottom:0.2rem solid #e9e9e9;padding-bottom:0.3rem;}
    .comment-img{width:1rem;height:1rem;border-radius: 50%;}
    .star-name{display:inline-block;font-size:0.35rem;vertical-align: middle;margin-bottom:0.4rem;margin-left:-0px;}
    .star-name>b{font-size:0.35rem;margin-right:0.1rem;color:#333;}
    .star-name>span{width:0.24rem;height:0.24rem;display:inline-block;}
    .comment-time{margin-top:-0.4rem;margin-left:1.8rem;font-size:0.28rem;color:#aaa;}

     .star-five-small{width:0.5trem;height:0.5rem;display:inline-block;background-image:url(../../static/images/call_star/icon-active.png); background-size:100%;} 

    .comment-content{}
    .comment-icon{display:inline-block;width:0.3rem;height: 0.3rem;background:url(../../static/images/personal/Message.png);background-size:100%;vertical-align: middle;}
    .comment-dec{vertical-align: middle;font-size:0.35rem;color:#393939;}
    .comment-server{font-size:0.28rem;color:#aaa;margin-top:0.1rem;}

    /* 打赏、回复 */
    .call-present,re-comment{font-size:0.35rem;color:#393939;height: 0.88rem;display:flex;align-items: center;}
    .call-icons{width:0.3rem;height:0.3rem;background:url(../../static/images/personal/present.png);background-size:100%;margin-right:0.1rem;}
    .call-present>b{font-size:0.35rem;color:#766bde;}
    .re-comment{background:#ccc;height:0.88rem;margin-right:0.21rem;color:#656565;font-size:0.32rem;text-indent:0.2rem;line-height:0.88rem;}
</style>

