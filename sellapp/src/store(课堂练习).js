import Vue from 'vue'
import Vuex, { mapGetters } from 'vuex'
import {reqNum} from './api/apis'
Vue.use(Vuex)
//创建一个数据仓库
let store=new Vuex.Store({
    state:{
        name:'张三',
        list:[],//商品的数组
        students:[{name:'小强',age:23},{name:'小花',age:12},{name:'小梨',age:23},{name:'狗子',age:5}]
    },
    //修改（state中）数据只能通过mutation修改
    mutations:{
        changeName(state,val){
            state.name=val
        },
        initGoods(state,obj){
            state.list=obj.data
        }

   },
   //异步数据
   actions:{
       async initGoods(context){
        let res= await reqNum()
         console.log(res.data.data,'1111');
           //通知发送给mutation
           context.commit({
               type:'initGoods',//函数名,mutation中的函数名可以和action中函数名一致，互不影响
               data:res.data.data
           })
       }
   },

   //计算属性（和vue中的computed类似）
   getters:{
       getchild(state){
          return state.students.filter(obj=>obj.age<=18)
       }
   }

})
//    console.log(store.getters.getchild);
   
   //调用
   //提交方式一：字符串  在改变函数中传递的是一个值
//    store.commit('changeName','禽兽')
   
   //提交方式二：对象 在改变函数中传的参数是一个对象
//    store.commit({
//        type:'changeName',//出发的函数名
//        name:'小强'
//    })
//    console.log(store.state.name);
   

  //action 异步调用
//    store.dispatch('initGoods')

export default store