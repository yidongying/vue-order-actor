<template>
   <div class="list-default">
    <div class="list-wrap" v-for="(data,index) in ktvList"  :key="index"  @click="KtvRender(index)">
        <div class="list-item">
            <!-- ktv图片缩览图 -->
            <!-- <img :src="data.img" :alt="data.title"> -->
            <div class="list-con">
                    <div  v-text="data.title"></div> 
                    <div  v-text="data.addr"></div> 
                    <div  v-text="data.discounts"></div> 
            </div>
            <div v-text="data.number" class="item-number-big"></div>
        </div>
    </div>
      <!-- <loadmore /> -->
   </div>
</template>
<script>

    import { LoadMore  } from 'vux'
    import loadmore from "./loadmore.vue"
    export default{
        components:{loadmore},
        props:['ktvList','pageConfig','city'],
        data(){
            return {
                noneInfo:false,
            }
        },
        computed:{
        },
        created(){
            //  console.log(this.ktvList);
            //  console.log(this.pageConfig);
            //  console.log(this.city);
        },
        methods:{
            //查询ktv的详细信息
            KtvRender(index){
                // console.log(this.ktvList[index].id);
                this.$ajax({
                    url:this.$store.state.url+"/api/ktv/id/"+this.ktvList[index].id,
                    method:"get"
                }).then((res)=>{
                    if(res.status==200){
                        console.log(res.data);
                        // this.ktvList=res.data.info
                    }
                },err=>{
                    console.log(err);
                })
                this.$router.push({name:'ktvDetails',params:{curktvId:this.ktvList[index].id}});
            },
        }
    }
</script>

<style>
    .list-item{display: flex;width:100%;height:2.3rem;align-items:center;}
    .list-item>img{height:1.6rem;width:2.1rem;margin-left:0.65rem;}
    .list-con{display: block;margin-left:0.2rem;}
    .list-con>div{font-size:0.28rem;color:#aaa;}
    .list-con>div:first-child{font-size:0.32rem;font-weight: bold;color:#393939;}
    
    .list-con>div:nth-child(3){color:#656565;text-indent:0.1rem;background:url(../../../static/images/homepage/preferential.png) no-repeat;background-size:15px 15px;text-indent:0.35rem;}
    .item-number-big{height:0.46rem;width:0.8rem;border:1px solid #3ab1fb;text-align:center;margin-right:0.3rem;font-size:0.3rem;color:#3ab1fb;align-self:flex-start;margin-top:0.4rem;}
</style>
