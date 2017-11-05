<template>
    <div>
       <div class="searchPage">
            <input type="search" placeholder="请输入要查询的Ktv名称" v-model="cityName">
            <input type="button" value="查询" @click="selectCity">
        </div>
        <div v-show="none">
            <div class="splite"></div>
            没有查询到该KTV
        </div>
        <list />
    </div>
</template>
<script>
    import list from "../components/list/index.vue"
    export default {
        components:{list},
        data(){
            return {
                cityName:'',
                ktvList:[],
                none:false,
            }
        },
        methods:{
            //点击查询按钮，向后台获取KTV信息
            selectCity(){
                // console.log(this.cityName);
                // 查询KTV信息。没有按城市区分
                this.$ajax({
                    url:this.$store.state.url+"/api/ktv/name/"+this.cityName,
                    methods:"get"
                }).then((res)=>{
                    console.log(res.data);
                    if(res.status==200){
                        this.ktvList=res.data.info
                    }
                    if(this.ktvList.length<=0){
                        this.none=true;
                    }
                })
            }
        }
    }
</script>
<style>
    .searchPage{height:1rem;width:100%;display:flex;justify-content: center; font-size:0.32rem;align-items:center;}
    input[type="search"]{
        background:#ccc;height:0.55rem;
    }
</style>
