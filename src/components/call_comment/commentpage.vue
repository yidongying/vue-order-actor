<template>
    <div class="commentPage">
        <div class="comment-list" v-for="comment in comments">
            <div class="comment-info">
                <img :src="comment.userHeadUrl" alt="comment.icon" class="header-image comment-img">
                <div class="cuser-name"><b>{{comment.userNickName}}</b>
                    <span class="star-five-small"></span>
                    <span class="star-five-small"></span>
                    <span class="star-five-small"></span>
                    <span class="star-five-small"></span>
                    <span class="star-five-small"></span>
                </div>
                <div class="comment-time" v-text="comment.createTime"></div>
            </div>
            <div class="comment-content">
                <span class="comment-icon"></span>
                <span class="comment-dec" v-text="comment.value"></span>
            </div>
            <!-- 打赏/回复 isCallStar判断用户是否打赏，isRecommnet判断艺人是否回复信息-->
            <div class="call-present" v-show="isCallStar">
                <i class="call-icons"></i>
                <span>打赏了Ta</span><b >{{call_comment.call_present}}</b>一朵
            </div>
            <div class="re-comment" v-show="isRecommnet">
                <div class="re-comment-content">Ta的回复：{{call_comment.re_commnet}}</div>
            </div>

            <!-- 具体服务(唱歌两小时跳舞一小时等) -->
            <div class="comment-server" v-text="comment.ktv"></div>
            
        </div>
    </div>
</template>
<script>

    export default{
        props:["comments"],
         data(){
            return {
                isCallStar:false,
                isRecommnet:false,
                call_comment:{
                     call_present:"玫瑰花",
                     re_commnet:"多谢大老板捧场"
                }
               
            }
        },
        created(){
            console.log(this.comments);
        }
    }
</script>
<style>
    /* 评价部分 */
    .comment-list{margin-top:0.2rem;padding-left:0.2rem;border-bottom:0.2rem solid #e9e9e9;padding-bottom:0.3rem;}
    .comment-img{width:0.8rem;height:0.8rem;vertical-align: bottom;border-radius: 50%;}
     .cuser-name{display:inline-block;font-size:0.3rem;vertical-align: middle;}
    .cuser-name>b{font-size:0.32rem;margin-right:0.1rem;}
    .cuser-name>span{width:0.24rem;height:0.24rem;display:inline-block;}
 
    .comment-time{margin-top:-0.4rem;font-size:0.28rem;color:#aaa;}
    
    /* 打赏、回复 */
    .call-present,re-comment{font-size:0.32rem;color:#393939;height: 0.88rem;display:flex;align-items: center;}
    .call-icons{width:0.3rem;height:0.3rem;background:url(../../../static/images/personal/present.png);background-size:100%;margin-right:0.1rem;}
    .call-present>b{font-size:0.32rem;color:#766bde;}
    .re-comment{background:#ccc;height:0.88rem;margin-right:0.21rem;color:#656565;font-size:0.3rem;text-indent:0.2rem;line-height:0.88rem;}
</style>
