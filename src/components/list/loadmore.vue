<template>
   <div class="list-default">
    <div class="list-wrap" v-for="data in list">
        <div class="list-item">
            <img :src="data.img" :alt="data.title">
            <div class="list-con">
                    <div  v-for="(item,index) in data.lists" v-text="item"></div> 
            </div>
            <div v-text="data.number" class="item-number-big"></div>
        </div>
    </div>
   </div>
</template>
<script>
    export default{
        data(){
            return {
                list:[
                  
                    {
                        img:"../../../../static/images/home-list/list1.png",
                        lists:{
                            title:"尚辰量贩KTV",
                            describe:"萝岗区科丰路89号萝岗万达广场",
                            price:"168元购晚场欢唱套餐",
                        },
                        number:"0201"
                    },
                 
                     {
                        img:"../../../../static/images/home-list/list1.png",
                        lists:{
                            title:"尚辰量贩KTV",
                            describe:"萝岗区科丰路89号萝岗万达广场",
                            price:"168元购晚场欢唱套餐",
                        },
                        number:"0201"
                    },
                ]
                
            }
        }
    }
</script>

<style lang="css" scoped>
    .list-item{display: flex;width:100%;height:2.3rem;align-items:center;}
    .list-item>img{height:1.6rem;width:2.1rem;margin-left:0.65rem;}
    .list-con{display: block;margin-left:0.2rem;}
    .list-con>div{font-size:0.28rem;color:#aaa;}
    .list-con>div:first-child{font-size:0.32rem;font-weight: bold;color:#393939;}
    .list-con>div:nth-child(3){color:#656565;}
    .item-number-big{height:0.46rem;width:0.8rem;border:1px solid #3ab1fb;text-align:center;margin-right:0.3rem;font-size:0.3rem;color:#3ab1fb;align-self:flex-start;margin-top:0.4rem;}
</style>
