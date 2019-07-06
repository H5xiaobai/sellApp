<template>
    <div class="nav">
        <!-- 头部 -->
       <div class="nav_title">
           <img :src="avatar"/>
           <div class="info">
               <h3><img src="../assets/images/brand@2x.png">{{name}}</h3>
               <p>{{description}}/{{deliveryTime}}分钟送达</p>
               <p><img src="../assets/images/decrease_1@2x.png"/>在线支付满28减5,满50减10</p>
           </div>
           <div class="mask"></div>
       </div>
       <div class="notice">
               <p class="icon1">
                   <img src="../assets/images/bulletin@2x.png">
                    {{bulletin}}
               </p>
        </div>
       <div class="nav-list">
            <Row>
                <Col span="8" style="height:40px">
                  <router-link to='/'>商品</router-link>
                </Col>
                <Col span="8" style="height:40px">
                  <router-link to='/evaluate'>评价</router-link>
                </Col>
                <Col span="8" style="height:40px">
                  <router-link to='merchant'>商家</router-link>
                </Col>
            </Row>
       </div>
       <router-view></router-view>
       <Shop></Shop>
    </div>
</template>

<script>
import Shop from './Shopcar'
//引入首页数据请求函数
import { reqNum } from "../api/apis.js";
    export default {
        components:{
             Shop
        },
        data(){
           return{
               avatar:'',//商家图片
               name:'',//商家 粥品香坊（天府新谷）
               description:'',//蜂鸟专送
               deliveryTime:0,//38
               bulletin:'',//公告
            //    background:'url(avatar)'
           }
        },
         async created(){
             let res=await reqNum()
             let data=res.data.data
            //  console.log(data);
             this.avatar=data.avatar
             this.name=data.name
             this.description=data.description
             this.deliveryTime=data.deliveryTime
             this.bulletin=data.bulletin
             document.querySelector('.nav_title').style=`background:url(${this.avatar})`
         }
        
    }
</script>

<style lang="less" scoped>
   .nav{
       .nav_title{
           width:100%;
           height:120px;
           padding: 20px;
           display: flex;
           flex-wrap: wrap;
           position: relative;
             &>img{
             width:80px;
             height:80px;
             }
          .info{
              h3{ 
               display: flex;
               justify-content:left;
               align-items: center;
               color: #fff;
               margin:5px 19px;
               img{
                   border-radius: 4px; 
                   width:16%;
                   margin-right: 10px;
                }
            }
           p{
               margin:8px 19px;
               font-size: 14px;
               color: #fff;
               &:last-child{
                   display: flex;
                   justify-content: left;
                   align-items: center;
               }
               img{
                   width:10%;
                   margin-right: 6px;
               }
            }
          }
          .mask{
              width:100%;
              height:120px;
              position: absolute;
              left:0;
              top:0;
              background-color: rgba(0,0,0,.3)
          }
         
       }
       .notice{ 
                padding: 10px;
                background-color: rgba(0,0,0,.8);
                .icon1{
                    
                     color: #fff;
                     overflow: hidden;
                     text-overflow: ellipsis;
                     white-space: nowrap;
                     
                    img{
                        width:10%;
                        height:10%;
                        vertical-align: middle;
                        margin:0 10px;
                        border-radius: 4px;
                    }
                    
                }
        }
       .nav-list{
          line-height: 40px;
           font-size:16px;
          text-align: center;
          .ivu-row{
              .ivu-col{
                 a{ 
                     color: #000;
                    &:hover{
                        color: red;
                    }
                 }
              }
          }
       }
   }  
</style>