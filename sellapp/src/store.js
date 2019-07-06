import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import {reqMenu} from './api/apis'
Vue.use(Vuex)


export default new Vuex.Store({

    state:{
       //定义一个商品的数组
       list:[]
    },
    mutations:{
       //将拿回的数据放进list中
      initlist(state,obj){
         state.list=obj.data
      },
      //商品数量修改
      changeNum(state,params){
         //obj.id 需要修改数量的id
         //obj.num  +1   -1 需要修改的是食品数量
         for(let obj of state.list){
            for(let food of obj.foods){
               if(food.id==params.id){
                   food.num +=params.num
                   return
                  }
               }
               
            }
      }
      
    },
    actions:{
       async initlist(context){
          //发送获取商品数据的请求
          let res=await reqMenu()
          let arr=res.data.data
          //添加前端自己的数据（h后台的数据没有提供id和num，但我们要用自己定义）
          let id=0;
          for(let obj of arr){
              for(let food of obj.foods){
                    food.num=0
                    food.id=id++
                  //   console.log(food);
              }
          }
          
          //把拿到的数据提交给mutation
          context.commit({
             type:'initlist',
             data:res.data.data
          })
       }
    },
    getters:{
        //过滤，提取只有商品数量大于0的数据
        goodsNumselected(state){
           let arr=[]//保存过滤后的数据
           for(let obj of state.list){
               for(let food of obj.foods){
                   if(food.num>0){
                      arr.push(food)
                   }
               }
           }
           return arr
        }
    }
})



