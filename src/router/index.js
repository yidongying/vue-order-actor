import  Vue from "vue"
import VueRouter from "vue-router"

import home from "../page/home.vue"
import searchPage from "../page/searchPage.vue"
import ktvDetails from "../page/ktvDetails.vue"

import order from "../page/order.vue"
import orderComment from "../page/orderComment.vue" 
import callComment from "../page/call_comment.vue"
import starDetails from "../page/starDetails.vue"

import personal from "../page/personal.vue"

Vue.use(VueRouter);
let router =new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            component:home
        },
        {
            path:'/order',
            component:order,
        },
        {
            path:'/personal',
            component:personal
        },
         {
            path:'/ktvDetails/:ktvId?',
            component:ktvDetails,
            name:'ktvDetails'
        },
        {
            path:'/searchPage',
            component:searchPage
        },
   
        {
            path:'/callComment',
            component:callComment
        },
        {
            path:"/starDetails/:starName",
            component:starDetails
        },
        {
            path:'/order/orderComment',
            name:'orderComment',
            component:orderComment
        }
    ]
})

export default router;