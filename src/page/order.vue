<template>
    <div class="box">
        <div class="dec-wrap" v-for="(server,index) in actors" :key="index">
        <div class="big-star_name"><span class="icon-ktvtitle"></span>{{ktvs[index].name}} 
            <!-- 通过hadServer判断是否服务是进行时还是已完成，-->
            <span class="duration" v-if="state[index]==0">进行中</span>
            <span class="hadServer" v-else>已完成</span>
        </div>
        <div class="list-dec" >
             <img :src="server.headImgUrl" :alt="server.nickname">
            <div class="list-header"> 
                <span class="dec-star_name" v-text="server.nickname"></span>
                <span class="dec-time" v-text="server.createTime"></span>
                <div class="dec-server" v-text="server.remark"></div>
            </div>
            <div class="list-right">
                <div class="dec-price">￥<b>{{orderPrice[index]}}</b></div> 
            </div>
        </div>
        <!-- 通过state[index]==1判断服务状态，结束可以打赏/评价 -->
            <div v-if="state[index]==0" class="star-status"><span>确定艺人到达</span></div>
            <div v-else class="hadserver-status">
                <span class="call-star" @click="callStar(index)">打赏Ta</span>
                <span class="comment-star" @click="commentStar(index)">评价</span>
            </div> 
            <!-- 打赏艺人 通过IsCallStar判断是否打赏-->
            <transition name="toggle">
                <div v-show="curIndex==index&&IsCallStar">
                    <!-- v-show="this.IsCallStar" -->
                    <div class="call_title">选择打赏礼物</div>
                    <ul>
                        <li v-for="(item,i) in callPeresents" class="call-list" :key="i">
                            <img :src="item.call_img">
                            <span v-text="item.name"><i>{{item.remark}}</i></span>
                            <span >￥<b>{{item.price}}</b></span>
                            <input type="checkbox" :id="i" ><label :for="index" @click="selectedPresents(i)" ></label>
                        </li>
                    </ul>
                    <div class="confirm-call" @click="confirmCall(index)">确定打赏 (<i>￥</i>{{total_price}})</div>
                </div>
            </transition>
               <!--评价艺人 通过IscommentStar判断是否评论 -->
            <div v-show="curIndex==index&&IscommentStar">
                <!-- v-show="this.IscommentStar" -->
                <div class="comment_title">评价艺人</div>
                    <!-- 星星评分 -->
                <ul class="star-light">
                    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :track-by="index" @click="stars(index)"></span>
                </ul>
                <div class="comment-edit"><input type="textarea" placeholder="一句话评价艺人" v-model="pc_comment" v-text="pc_comment"></div>
                <div class="confirm-call" @click="submitComment">提交评价</div>
            </div>
        </div>
        <!-- 弹窗提示 -->
        <alert v-model="commentTip" content="评论成功"/>
        <alert v-model="Paytip" content="支付成功"/>


    </div>
</template>
<script>
    import {Alert} from "vux"
    export default{
        components:{Alert},
        data(){
            return {
                hadServer:true, //判断艺人服务状态
                IsCallStar:false, //判断是否需要加载打赏组件
                IscommentStar:false, //判断是否需要加载评论组件
                pc_comment:"",
                curIndex:0,
                presentsCount:0,
                Paytip:false,//支付成功提示
                pageConfig:{size:3,page:1,maxSize:0},
                IslightIcon:false,
                starLight:false,
                score:5,//初始化星星评分score为5
                orderId:[],  //保存订单ID
                state:[],   //保存订单状态
                orderPrice:[],  //订单价格
                presentId:[],
                buyId:[],
                actorId:[],
                allComment:[],//获取该订单下的所有评论
                commentTip:false,//评论成功后的提示信息，默认不显示
                Presentstate:[],
                ktvs:[],
                actors:[
                    // {
                    //    img:"../../../static/images/star/star1.jpg",
                    //    star_name:"韩文",
                    //    time:"08-01 03:44",
                    //    price:"565",
                    //    dec_server:"唱歌两小时跳舞一小时  服务",
                    // },
                    //  {
                    //    img:"../../../static/images/star/star1.jpg",
                    //    star_name:"韩文",
                    //    time:"08-01 03:44",
                    //    price:"565",
                    //    dec_server:"唱歌两小时跳舞一小时  服务",
                    // },
                ],
                callPeresents:[
                    // {name:'flower',call_img:"../../../static/images/call_star/flower.png",call_title:"玫瑰花",price:99,checked:false},
                    // {name:'refuelingbar',call_img:"../../../static/images/call_star/refuelingbar.png",call_title:"充气加油棒",price:100,checked:false},
                    // {name:'glosticks',call_img:"../../../static/images/call_star/glo-sticks.png",call_title:"荧光棒",price:66,checked:false}
                ],
            }
        },
        computed:{
            // 计算打赏总价
            total_price:function(){
                var total = 0;
                // var presentsList=this.$refs.presentsList;
                // conosole.log(presentsList);
                // for(var index in presentsList){
                //     if(this.curPresent==index){
                //         total += this.callPeresents[index].price;
                //     }
                // }
                for(var i in this.Presentstate){
                    if(this.Presentstate[i].checked){
                        total += this.callPeresents[i].price;
                    }

                    //  console.log(this.callPeresents[i].checked);
                    //  console.log(this.callPeresents[i].price);
                }
                return total;
            },
            //动态计算星星评分
            itemClasses(){
                this.score>5?this.score=5:this.score;
                let result=[];
                let score=Math.floor(this.score*2)/2;
                let integer=Math.floor(score);
                for (let i=0;i<integer;i++){
                    result.push("on");
                    }
                while(result.length<5){
                    result.push("off");
                }
                return result;
            }
        },
        watch: {
            //监听路由,发生变化重新向后台发送请求  "featchDate"
            $route:{
                handler(){
                    // 更新礼物信息
                    this.$ajax({
                        url:this.$store.state.url+'/api/gift/update',
                        method:'post',
                        data:{
                            name:'',
                            remark:'',
                            price:'',
                            presentId:''
                        }
                    }).then(res=>{
                        console.log(res.data);
                    });
                },
                deep:true
            }
        },
        created(){
            // state 订单状态0等待支付1支付成功等待艺人到达2确认订单3取消订单
            // this.$ajax({
            //     url:this.store.state.url+"api/order/findAllm"+this.state,
            //     method:"get"
            // }).then((res)=>{
            //     if(res.status==200){
            //          this.actors=res.data.info;
            //     }
            // });
            this.getData();
        },
        mounted(){
            
        },
        methods:{
            getData(){
            // 用户查询个人订单
                this.$ajax({
                    url:this.$store.state.url+"/api/order/user",
                    method:"get",
                    params:{
                        size:this.pageConfig.size,
                        page:this.pageConfig.page
                    },
                    headers:{
                        Accept:"application/json; charset=utf-8",
                        Token:localStorage.getItem("userToken")
                    }
                }).then((res)=>{
                    if(res.status==200){
                        let temparr=res.data.parms.orders;
                        temparr.map((item,i,arr)=>{
                           //获取某订单的艺人信息
                           this.actors.push(temparr[i].actor);
                           this.ktvs.push(temparr[i].ktv);
                        //    console.log(this.ktvs[i].name);

                           if(this.actors[i].state==1){
                              this.hadServer=false;  
                           }
                            //获取订单状态：0等待支付1支付成功等待艺人到达2确认订单3取消订单
                            this.state.push(temparr[i].state);
                            //获取订单ID
                            this.orderId.push(res.data.parms.orders[i].id);
                            //获取订单价格
                            this.orderPrice.push(temparr[i].price);
                        },err=>{console.log(err)})
                    }
                });
            },
            selectedPresents(index){
                // this.curPresent=index;
                // console.log(this.callPeresents[index].checked);
                 this.callPeresents[index].checked=!this.callPeresents[index].checked;
                // if(this.callPeresents[index].checked){
                //     this.Presentstate.push(this.callPeresents[index].checked);
                //     if( this.Presentstate[index].checked==this.callPeresents[index].checked){
                //          return ;
                //     }
                //     // this.Presentstate[index].checked!=this.Presentstate[index].checked
                // }
                // console.log(this.Presentstate.length);
            },
            // （添加礼物）
            addPresents(){
                 this.$ajax({
                    url:this.$store.state.url+"/api/gift/add"+"?name="+this.callPeresents.name+"&remark="+this.callPeresents.call_title+"&price="+this.callPeresents.price,
                    method:"post",
                    data:{},
                    headers:{
                        Accept:"application/json chartset=utf-8",
                        Token:localStorage.getItem("userItem")
                    }
                }).then((res)=>{
                    if(res.status==200){
                         console.log(res.data);
                    }
                });
            },
            //获取用户点击星星评分score
            stars(index){                
                this.score=index+1;
               localStorage.setItem("score",this.score);
                //  console.log(localStorage.getItem('score'));
            },
            //获取礼物信息
            callStar(index){
                //查询礼物
                this.$ajax({
                    url:this.$store.state.url+"/api/gift/find",
                    method:'get',
                }).then(res=>{
                    console.log(res.data);
                    if(res.status=200){
                        this.callPeresents=res.data.parms.gift;

                        console.log(this.callPeresents[index].id);
                    }
                },err=>{console.log(err)})
                //打开打赏界面
                this.curIndex=index;
                this.IsCallStar=! this.IsCallStar;
                this.IscommentStar=false;
            },
            commentStar(index){
                this.curIndex=index;
                this.IscommentStar=!this.IscommentStar;
                this.IsCallStar=false;
            },
           closecComment(){
               this.pc_comment='';
           },
            confirmCall(index){
             //用户下单（打赏礼物）
                this.$ajax({
                    url:this.$store.state.url+'/api/order/user'+"?type=1&buyId="+this.buyId[index]+"&presentId="+this.presentId[index]+"&ktvId="+this.ktvId[index]+"&sendId="+this.actorId[index],
                    method:'post',
                    data:{
                        // type:1,
                        // buyId:'',//被购买的id
                        // presentId:'',
                        // ktvId:'',
                        // sendId:''  //被赠送的艺人的id
                    }
                }).then(res=>{
                    console.log(res.data);
                    if(res.status==200){
                        this.Paytip=true;
                        //向后台提交下单完成信息并发送订单号
                        this.$ajax({
                            url:'/api/wxpay/wxPay/'+this.orderId[index],
                            method:'post',
                            data:{}
                        }).then(res=>{
                            console.log(res.data);
                            if(res.status==200){
                                
                            }
                        });
                    }
                })
            },
            // 提交用户评价
            submitComment(index){
                // console.log(localStorage.getItem('score'));
                console.log(this.orderId[index]);
                //提交用户评论信息
                this.$ajax({
                    url:this.$store.state.url+"/api/comment/user"+"?value="+this.pc_comment+"&score="+localStorage.getItem('score')+"&orderId="+this.orderId[index],
                    method:"post",
                    data:{},
                    headers:{
                        Accept:'*/*',
                        Token:localStorage.getItem("userToken")
                    }
                }).then((res)=>{
                    // console.log(res.data);
                    if(res.status==200){
                        this.commentTip=true;
                    }
                    setTimeout(()=>{
                        this.IscommentStar=false;
                    },500);
                })
                 this.pc_comment='';  //清空评价框
                 setTimeout(()=>{
                    this.$router.push({name:'orderComment',params:{orderId:this.orderId[index]}})
                 },3000);
                 
            }
        }
    }
</script>
<style>
    .big-star_name{height:1rem; width:8rem;font-size:0.4rem;color:#656565;display:flex;justify-content: flex-start; margin-left:0.2rem;align-items:center;border-bottom:1px solid #ccc;}
    .icon-ktvtitle{background:url(../../static/images/call_star/shop.png);background-size:100%;display:inline-block;height:0.5rem;width:0.5rem;margin-right:0.1rem;}
    .duration{font-size:0.3rem;color:#3ab1fb;margin-left:auto;}
       /* 已完成时的样式 */
    .hadServer{font-size:0.3rem;color:#ccc;margin-left:auto;}

    .list-dec>img{height:1.2rem;width:1.2rem; border-radius: 0.8rem;background:#000;vertical-align: middle;margin-right: 0.1rem;}
    .list-header>span{vertical-align: middle;}

    .list-dec{display:flex;margin-left:0.2rem;height:2rem;align-items:flex-start;border-bottom:0.01rem solid #e1e1e1; margin-top:0.66rem;

    }
    .dec-star_name{color:#393939;font-size:0.45rem;font-weight: bold;display:block;}
    .dec-time{color:#aaa;font-size:0.4rem;display:block;}
    .list-right{margin-left:auto;margin-right:0.2rem;}
    .dec-price{font-size:0.32rem;}
    .dec-price>b{font-size:0.45rem;}
    .dec-server{font-size:0.4rem;color:#656565;}

    .star-status>span,.call-star,.comment-star{ height: 0.86rem;width:1.72rem; border:1px solid #766BDE;border-radius:5px;text-align:center;line-height: 0.86rem;font-size:0.32rem;color:#766BDE;}
    .star-status{width:100%;display:flex;align-items:center; border-bottom: 10px solid #e1e1e1;padding-bottom:0.2rem;}
    .star-status>span{display:inline-block;width:2rem;margin-left:auto;margin-top:0.1rem;margin-right:0.1rem;}
    .call-star{color:darkorange;border-color:darkorange;}
    .hadserver-status{display:flex;justify-content: flex-end;height:1.5rem;align-items:center; border-bottom: 10px solid #e1e1e1;font-size:0.28rem;}
    .comment-star{margin-left:0.2rem;margin-right:0.1rem;}

    /* 打赏/评价部分 */
    .call_title{font-size:0.32rem;color:#393939;height: 1rem;line-height:1rem;text-indent:0.2rem;border-bottom:1px solid #ccc;}
    .call-list,.comment_title{display:flex;height:1.34rem;align-items:center;border-bottom:1px solid #ccc;color:#393939;font-size:0.32rem;text-indent:0.2rem;}
    .call-list>img{height: 0.5rem;width:0.5rem;margin-left:0.4rem;}
    .call-list>span:nth-child(2){font-size:0.32rem;flex-grow:2;width:0.3rem;}
    .call-list>span:nth-child(3){font-size:0.32rem;flex-grow:1;width:0.2rem;}
    .call-list>span:nth-child(4){flex-grow:0;margin-right:0.5rem;}
    .call-list>span>b{font-size:0.4rem;}
    .confirm-call{margin:10px auto 0px;height:1rem;width:5rem;background:#766BDE;text-align:center;line-height:1rem;font-size:0.32rem;color:#fff;}

   
    input[type="checkbox"],input[type="checkbox"]:checked{display:none;}
    input[type="checkbox"]+label{display: inline-block;width:0.4rem;height: 0.4rem;margin-right:0.4rem; 
            background: url(../../static/images/call_star/correct-normal.png);background-size:100%;}
   
    input[type="checkbox"]:checked+label{
        
        background:url(../../static/images/call_star/correct-selected.png);
        background-position:0 -0.4rem;
        background-size:100%;
    }

    input.activebox{background:url(../../static/images/call_star/correct-selected.png)}
    input[type="checkbox"], input.activebox{width:0.4rem;height:0.4rem;}
    /* 星星评分 */
    .star-light{display:flex;height:1rem;font-size: 0;}
    .star-item{
        display: inline-block;
        background-repeat: no-repeat;
        height:0.5rem;width:0.5rem;
        background-size: 100%;
        margin-top:0.2rem;margin-left:0.2rem;
     }
     .star-item.on{
       background-image:url(../../static/images/call_star/icon-active.png);
     }
    .star-item.off{
        background-image: url(../../static/images/call_star/icon-normal.png);
    }

    .comment-edit{display:flex;justify-content: center;}
    input[type='textarea']{font-size:0.32rem;color:#ccc;height:1.46rem;width:7rem;background:#e9e9e9;border:1px solid #dedede;vertical-align: top;text-indent:0.2rem;}
    .confirm-call{margin-top:0.2rem;}

    /* 切换小动画 */
    .toggle-enter,.toggle-leave-active{opacity: 0;transform: translate3d(0 20% 0);}
    .toggle-enter-active,.toggle-leave-active{transition:all 0.5s cubic-bezier(0.4 0 0  1.5)}
</style>

