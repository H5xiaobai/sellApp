import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/Goods.vue'
Vue.use(Router)

export default new Router({
  routes: [
    //商品应该首次加载
       {
         path:'/',
         name:'goods',
         component:Goods
       },
    //评价   懒加载
        {
          path:'/evaluate',
          component:()=>import('./pages/Evaluate.vue')
        },
    //商家  懒加载
        {
         path:'/merchant',
         component:()=>import('./pages/Merchant.vue')
        } 
    
  ]
})
