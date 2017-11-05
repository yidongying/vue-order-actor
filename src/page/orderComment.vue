<template>
    <div>
        <div class="comment-list" v-for="comment in allComment">
            <div class="comment-info">
                <img :src="comment.img" alt="comment.icon" class="header-image comment-img">
                <div class="cuser-name"><b>{{comment.name}}</b>
                    <span class="star-five-small"></span>
                </div>
                <div class="comment-time" v-text="comment.time"></div>
            </div>
            <div class="comment-content">
                <span class="comment-icon"></span>
                <span class="comment-dec" v-text="comment.dec"></span>
            </div>
            <!-- 具体服务 -->
            <div class="comment-server" v-text="comment.server"></div>
        </div>
    </div>
</template>
<script>
    export default{
        // props:['allComment'],
        data(){
            return {
                allComment:[]
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                console.log(this.$route.params.orderId);
                //提交成功后获取该订单的评论
                this.$ajax({
                    url:this.$store.state.url+"/api/comment/findo/"+this.$route.params.orderId,
                    method:'post',
                    data:{}
                }).then((res)=>{
                    console.log(res.data);
                    if(res.status==200){
                        // this.allComment=res.data.info;
                    }
                })
            }
        }
    }
</script>