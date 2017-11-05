<template>
     <div class="comment">
         <!-- 打赏页面 -->
        <div class="comment-list" v-for="comment in comments" >
            <div class="comment-info">
                <img :src="comment.img" alt="comment.icon" class="header-image comment-img">
                <div class="user-name"><b>{{comment.user_name}} </b>&nbsp;&nbsp;<span>打赏了<b>{{comment.comment_present}}</b></span>一朵
                <span class="present-price">￥<b v-text="comment.price"></b></span> </div>
                <div class="comment-time" v-text="comment.time"></div>
            </div>
            <!-- 具体服务 -->
            <div class="comment-server" v-text="comment.server"></div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                iscommentStar:false,
                isRecommnet:false,
                comments:[
                    {
                        img:'../../../static/images/star/star1.jpg',
                        user_name:'斯卡拉7a6',
                        comment_present:'玫瑰花',
                        time:'08-01  03:08',
                        price:'99',
                        server:'尚辰量贩KTV·唱歌两小时服务'
                    },
                  {
                        img:'../../../static/images/star/star1.jpg',
                        user_name:'斯卡拉767',
                        comment_present:'玫瑰花',
                        time:'08-01  03:08',
                        price:'99',
                        server:'尚辰量贩KTV·唱歌两小时服务'
                    },
                ],
            }
        }
    }
</script>
<style>


    .comment-list{margin-top:0.2rem;padding-left:0.2rem;border-bottom:0.2rem solid #e9e9e9;padding-bottom:0.3rem;}
    .comment-img{width:0.8rem;height:0.8rem;vertical-align: bottom;border-radius: 50%;}
    .user-name{display:inline-block;font-size:0.33rem;}
    .user-name>b{font-size:0.32rem;margin-right:0.1rem;}
    .user-name>span{width:0.24rem;height:0.24rem;}
    .comment-time{margin-top:-0.4rem;margin-left:0.9rem;font-size:0.28rem;color:#aaa;}
    .present-price{font-size:0.32rem;margin-left:0.7rem;}

 
   
</style>
