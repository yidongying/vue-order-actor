<template>
    <div class="box">
        <call_commnet_common />
         <div class="call-comment">
             <a href="#" v-for="(item,index) in call_comment"><i :class="{active:curIndex==index}" v-text="item" @click="callCommentHandle(index)"></i></a>
         </div>

         <!-- 评论组件 -->
         <comment v-show="isComment" :comments="comments"/>
         <!-- 打赏组件 "-->
           <call v-show="!isComment"/>
    </div>
</template>
<script>
    import comment from "../components/call_comment/commentpage.vue"
    import call from "../components/call_comment/callpage.vue"
    import call_commnet_common from "../components/call_comment/call_commnet_common.vue"
    export default{
        name:'callComment',
         components:{
             call_commnet_common,
             call,
             comment
             },
        data(){
            return {
                curIndex:0,
                isComment:false,
                call_comment:["评论","打赏"],
                actorId:'',
                comments:[
                      {
                        img:'../../../static/images/star/star1.jpg',
                        name:'斯卡拉7a6',
                        time:'08-01  03:08',
                        dec:"我觉得还可以",
                        server:'尚辰量贩KTV·唱歌两小时服务'
                    },
                    {
                        img:'../../../static/images/star/star1.jpg',
                        name:'斯卡拉7a6',
                        time:'08-01  03:08',
                        dec:"我觉得还可以",
                        server:'尚辰量贩KTV·唱歌两小时服务'
                    }
                ]
            }
        },
        methods:{
            callCommentHandle(index){
                this.curIndex=index;
                if(this.curIndex==0){
                    this.isComment=true;
                    // 获取某个艺人的评论
                   this .$ajax({
                       url:this.$store.state.url+'/api/comment/finda/'+this.actorId,
                       methods:"get",
                       params:{
                           actorId:this.actorId,
                           size:this.pageConfig.size,
                           page:this.pageConfig.page
                       }
                    }).then((res)=>{
                        if(res.data.Code==200){
                            this.comments=res.data.comment
                        }
                    })
                }else
                    this.isComment=false;
            }
        }
    }
</script>
<style>
   .call-comment{display:flex;justify-content: center;border-bottom:1px solid #ccc;}
   .call-comment>a{display:inline-block;width:50%;text-align:center;font-size:0.32rem;line-height: 1rem;}
   /* call/comment当前活动组件样式 */
   .call-comment>a>i.active{display:inline-block;height:100%;border-bottom:3px solid #776bde;}
</style>

