<template>
  <div style="height:100%;" id="app">
    <!--<div>{{myti}}</div>-->
      <!-- 左边的地址选择 -->
      <transition name='vux-pop-out'>
        <!-- <fullpage v-if='iShow'>
          <a @click='iShow=!iShow'> 返回</a>
          <div style="color:#333">
            这下面是地址选择
          </div>
        </fullpage> -->
      </transition>

      <view-box ref="viewBox">
        <!-- 头部 -->
        <x-header  :left-options="{showBack: false}" >
        <a slot="left" @click='comeback'><span class="iconfont icon-comeback "></span><span class="header-comeback">返回</span></a>
          点个艺人
         <a slot="right"><span class="icon-ellipsis">...</span></a>

        </x-header>
        <!-- 使用转换 -->
         <!--<search-bar></search-bar>-->
         <transition :name='"vux-pop-in"'>
          <router-view class="router-view"></router-view>
        </transition>
        <!-- 底部bar -->
        <tabbar class="" icon-class="iconfont">
          <tabbar-item link='/' selected="/">
            <span class="iconfont icon-shouyeshouye" slot="icon"></span>
            <span slot="label">首页</span>
          </tabbar-item>
                        <!-- badge="2" -->
           <tabbar-item  link='/order'>  
              <span class="iconfont icon-gouwuche2" slot="icon"></span>
              <span slot="label"><span>订单</span></span>
            </tabbar-item>
          <tabbar-item link='/personal'>
              <span class="iconfont icon-youke" slot="icon"></span>
              <span slot="label">我的</span>
          </tabbar-item>
        </tabbar>
    </view-box>
  </div>
</template>

<script>
import { XHeader, Tabbar, TabbarItem,ViewBox} from 'vux';
// import fullpage from 'components/fullpage';
// import searchBar from 'components/searchBar';
export default {
    data(){
      return{
        iShow:false,
        iShowSearch:true,
        index:0,
      }
    },
    components: {
      XHeader,
      Tabbar,
      TabbarItem,
      ViewBox
      // fullpage,searchBar,
    },
    methods:{
        comeback(){
        this.iShow=!this.iShow;
        history.go(-1);
        }
    }
}
</script>

<style lang="scss">
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
   span.iconfont{
    font-size:22px;
     color:#766bde;
     font-weight:bold;
  }

  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#766bde !important;}
  .icon-comeback{display:inline-block;height:0.5rem;width:0.5rem;background:url(../static/images/homepage/backicon.png);background-size:100%;
            background-position: top center;vertical-align:middle;margin-top:-0.1rem;}
  .header-comeback{color:#ccc;font-size:18px;}
  .icon-ellipsis{font-size:30px;display:inline-block;width:30px;height:30px;margin-top:-20px;font-weight:bold;}
  p.weui-tabbar__label{font-size: 12px;margin: 0;}

  @import '../src/assets/scss/main.scss';
  @import '../src/assets/icon/icon.scss';
</style>
