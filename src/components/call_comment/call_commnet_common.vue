<template>
  <div class="star-info">
    <div class="star-header">
        <img :src="star_info.headerImg" :alt="star_info.title">
        <b v-text="star_info.title"></b>
        <input type="button" value="点播Ta">
    </div>
    <div class="star-bardian" v-text="star_info.bardian"></div>

    <div class="splite"></div>

    <div class="star-servers">
        <div class="star-servers-title">Ta的服务</div>
        <span v-text="star_info.star_server" class="star-servers-content"></span>
        <span class="star-servers-price"><i>￥</i><b>{{star_info.star_price}}</b>/次</span>
    </div>
        <div class="splite"></div>

    <div class="skill-photo">
        <div class="skill-photo-title star-servers-title">才艺照片</div>
        <div class="skill-photo-display">
            <input type="file" >
            <img v-for="item in star_info.skill_photo" v-text="item" :src="item" :alt="star_info.title">
        </div>
    </div>
    <div class="splite"></div>
  </div>
</template>
<script>
    export default{
        data(){
            return {
                star_info:{
                    headerImg:'../../../static/images/star/star1.jpg',
                    title:'李娜是男的吗',
                    bardian:'亮出甜美的微笑，展示最美好的自己!亮出甜美的微笑，展示最美好的自己!亮出甜美的微笑，展示最美好的自己!',
                    star_server:'唱歌两小时跳舞一小时',
                    star_price:'568',
                    skill_photo:["../../../static/images/star/star1.jpg","../../../static/images/star/star1.jpg"]
                }
            }
        }
    }
</script>
<style>
    .star-header{display:flex;align-items:center;height:2rem;justify-content: center;}
    .star-header>img{width:1.6rem;height:1.6rem;border-radius:50%;margin-left:0.2rem;}
    .star-header>b{font-size:0.36rem;color:#393939;margin-top:0.4rem;display:inline-block;margin-left:0.2rem;}
    .star-header>input{width:1.96rem;height:0.8rem;font-size:0.4rem;margin-left:auto;margin-right:0.2rem;background:#766BDE;color:#fff;border-radius: 0.2rem;}
    .star-bardian{color:#aaa;font-size:0.32rem;line-height:0.5rem;margin-left:0.2rem;margin-right:0.2rem;}

    .splite{height:0.18rem;display:flex;align-items:center;background:#e1e1e1;}
    /* Ta的服务 */
    .star-servers-title,.star-servers-content{color:#393939;font-size:0.32rem;height:1rem;text-indent:0.2rem;}
    .star-servers-title{border-bottom:1px solid #ccc;display:flex;align-items:center;}
    .star-servers-content{display:inline-block;vertical-align: middle;line-height:1rem;}
    .star-servers-price{color:#393939;font-size:0.28rem;margin-left:1.2rem;display:inline-block;}
    .star-servers-price>i{font-size:0.3rem;}
    .star-servers-price>b{font-size:0.4rem;}

    .skill-photo-display{height:2.4rem;display:flex;align-items:center;}
    .skill-photo-display>img{height:1.6rem;width:1.6rem;margin-left:0.2rem;}
</style>
