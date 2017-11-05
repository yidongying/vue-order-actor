<template>
<div class="box">
     <swiper loop auto :list="ktvImg" ></swiper>   
        <!-- <img :src="ktvDetail.ktvImg" :alt="ktvDetail.title"> -->
     <div class="ktvDetails list-item" v-for="(ktvDetail,index) in ktvDetails">
        <div class="ktv-title">
            <div class="item-title">{{ktvDetail.title}}<span class="item-number">{{ktvDetail.number}}</span></div>
            <div class="ktv-addr"><i></i>{{ktvDetail.addr}}</div>
        </div>
        <div class="splite"></div>
        <div class="discount">
            <div class="discount-title">优惠活动</div>
            <div class="discount-content" v-for="item in ktvDetail.discounts"><span class="discount-icon"></span>{{item}}</div>
        </div>
        <div class="splite"></div>
        <div class="server-star">
            <div class="server-title">服务艺人</div>
            <div class="grid_wrapper">
                 <div class="star-server-content grid" v-for="(item,index) in server_star">
                     <div class="star-header-name" >
                         <div class="star-name" @click="getStarInfo(index)"><span></span>{{item.name}}</div>
                         <img :src="item.headerImg" :alt="item.name" @click="getStarInfo(index)">
                     </div>
                    <div class="star-servers" v-text="item.servers"></div>
                    <div class="star-bardian" v-text="item.bardian"></div>
                    <div class="star-price"><i>￥</i>{{item.price}}</div>
                </div>
                
            </div>
           
        </div>
    </div>
</div>
     
</template>
<script>
    import {Swiper} from "vux"
    export default{
        components:{Swiper},
        data(){
            return {
                //ktv门店图片（轮播图）  
                ktvImg:[
                    {img:'../../static/images/banner//banner1.jpg',title:''},
                    {img:'../../static/images/banner//banner2.jpg',title:''},
                    {img:'../../static/images/banner//banner3.jpg',title:''}
                ],
                ktvId:2,
                 //模板信息（ktv详细信息）
                ktvDetails:[
                   {
                        title:"尚辰量贩KTV",
                        number:"0201",
                        addr:"萝岗区科丰路89号萝岗万达广场四楼",
                        discounts:["168元购晚场欢唱套餐","七夕情人节满520减99元"],
                    },
                ],
                //模板信息（服务艺人详细信息）
                server_star:[
                            {
                                name:'李娜',
                                headerImg:'../../../static/images/star/star1.jpg',
                                servers:'唱歌两小时跳舞一小时',
                                bardian:"亮出甜美的微笑，展示最美好的自己...",
                                price:'568'
                            }, {
                                name:'李娜',
                                headerImg:'../../../static/images/star/star1.jpg',
                                servers:'唱歌两小时跳舞一小时',
                                bardian:"亮出甜美的微笑，展示最美好的自己...",
                                price:'568'
                            },
                             {
                                name:'李娜',
                                headerImg:'../../../static/images/star/star1.jpg',
                                servers:'唱歌两小时跳舞一小时',
                                bardian:"亮出甜美的微笑，展示最美好的自己...",
                                price:'568'
                            },
                ]   //当前ktv下艺人信息
            }
        },
        created(){
            // this.getData();
        },
        methods:{
            getData(){
                this.ktvId=this.$route.params.curktvId;
                 console.log(this.ktvId);
                // 根据id查询Ktv详细信息
                    this.$ajax({
                        url:this.$store.state.url+"/api/ktv/id/"+this.ktvId,
                        method:"get"
                    }).then((res)=>{
                        //  console.log(res.data);
                        if(res.status==200){
                            this.ktvDetails.title=res.data.parms.ktvs.name;
                            this.ktvDetails.addr=res.data.parms.ktvs.addr;
                            this.ktvDetails.discounts=res.data.parms.ktvs.discounts;
                            // this.ktvDetails.number=res.data.parms.ktvs.
                        }                
                    });
                //  根据ktvId查询该KTV下活动的艺人
                    this.$ajax({
                        url:this.$store.state.url+"/api/ktv/actorsum/"+this.ktvId,
                        method:"get"
                    }).then((res)=>{
                        console.log(res.data);
                        if(res.status==200){
                            this.server_star=res.data.parms.actors;   //艺人信息对应，actors暂无信息
                        }
                    },err=>{console.log(err)});
            },
            getStarInfo(index){
                // 查找KTV下活动的艺人 ktv端
                //     this.$ajax({
                //         url:this.$store.state.url+"/api/ktv/actors",
                //         method:"get"
                //     }).then((res)=>{
                //         if(res.status=200){
                //             console.log(res.data);
                //             this.server_star=res.data.actor;
                //         }
                // })
            this.$router.push({path:'/starDetails/'+this.server_star[index].name,params:{actorId:this.server_star[index].id}});
            console.log(this.server_star[index].id);
            }
        }
    }
</script>

<style lang="css" scoped>
    .ktvDetails{display:block;}
    .ktv-title{height:1.82rem;display:table-cell;vertical-align: middle;text-indent:0.3rem;}
    .item-title{font-size:0.36rem;color:#393939;font-weight: bold;}
    .ktv-addr{font-size:0.3rem;color:#aaa;}
    .ktv-addr>i{display:inline-block; width:0.3rem;height:0.3rem; background-image:url(../../static/images/ktvDetails/location.png);background-size:100%;margin-top:0.1rem;}
    .item-number{border:1px solid #3ab1fb;text-align:center;font-size:0.2rem;color:#3ab1fb;margin-left:0.2rem;}
    /* 优惠服务 */
    .splite{background:#e9e9e9;height:0.18rem;}
    .discount-title,.server-title{display:flex;align-items:center;height:1rem;font-size:0.32rem;color:#393939;text-indent:0.2rem; border-bottom:1px solid #ccc;}
    .discount-content{display:table=cell;vertical-align: middle; font-size:0.32rem;color:#656565;line-height:0.5rem;display:flex;align-items:center;margin-left:0.2rem;height:0.8rem;}
    .discount-icon{display: inline-block; width:0.3rem;height:0.3rem; background:url(../../static/images/homepage/preferential.png);background-size:100%;}

    /* 服务艺人 */
     .server-title{height:1rem;display:flex;align-items:center;}
    .grid_wrapper{display:flex;width:100%;flex-wrap:wrap;}
    .star-server-content{width:49.5%;text-align:center;border:1px solid #ccc;position: relative;top:-1px; height:5rem;}
    .star-server-content:nth-child(2n){border-right:none;}

    .star-header-name{display:block;}
    .star-name{font-size:0.3rem;color:#aaa;text-align:left;text-indent:0.2rem;margin-left:-2.5rem;}
    .star-name>span{display: inline-block;width:0.35rem;height:0.35rem;background:url(../../static/images/ktvDetails/person.png);background-size: 100%;}
   .star-header-name>img{display:block;width:1.2rem;height:1.2rem;border-radius:50%;margin:0 auto;margin-top:-20px;}
    .star-servers{color:#393939;font-size:0.3rem;margin-top:0.3rem;}
    .star-bardian{font-size:0.28rem;color:#aaa;text-align:start;width:80%;margin-left:0.2rem;}
    .star-price{font-size:0.4rem;font-weight: bold;color:#393939;text-align:start;margin-top:-0.2rem;margin-left:0.2rem;}
    .star-price>i{font-size:0.3rem;}
</style>


