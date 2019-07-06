<template>
    <div class="merchant">
          <div class="sellnum">
              <div class="selltop">
                  <div class="leftbox">
                      <h3>{{name}}</h3>
                      <p class="sellimg"><img v-for="(v,i) in getInt" :key="i" src="../assets/images/star36_on@2x.png">
                      <img v-show="getFloat" src="../assets/images/star36_half@2x.png">({{ratingCount}})<span>月售{{sellCount}}单</span></p>
                  </div>
                  <div class="rightbox">
                        <p class="icon-one"><Icon type="ios-heart" /></p>
                        <p>已收藏</p>
                  </div>
              </div>
              <!-- 配送时间 -->
              <div class="sellbottom">
                   <div class="item">
                       <p>起送价</p>
                       <p class="pone">{{minPrice}}快</p>
                   </div>
                   <div class="item">
                       <p>商家配送</p>
                       <p class="pone">{{deliveryPrice}}元</p>
                   </div>
                   <div class="item last-item">
                       <p>平均送达时间</p>
                       <p class="pone">{{deliveryTime}}分钟</p>
                   </div>
              </div>
          </div>
          <div class="bg"></div>
          <!-- 公关与活动 -->
          <div class="active-tell">
               <div class="active-title">
                   <h3>公告与通知</h3>
                   <p>{{bulletin}}</p>
               </div>
               <ul>
                   <li v-for="(v,i) in supports" :key="i">
                    <img v-show="flag" src="../assets/images/decrease_3@2x.png">{{v.description}}
                   </li>
               </ul>
          </div>
          <div class="bg"></div>
          <!-- 商家图片 -->
          <div class="sellerImg">
               <h3>商家实景</h3>
               <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide  v-for="(item,index) in pics" :key="index">
                        <div class="demo-carousel">
                            <img :src=item>
                        </div>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <div class="swiper-scrollbar"   slot="scrollbar"></div>
                </swiper>
               <!-- <p> 
                    <Carousel v-model="value" loop>
                        <CarouselItem v-for="(item,index) in pics" :key="index">
                            <div class="demo-carousel">
                                    <img :src=item>
                            </div>
                        </CarouselItem>
                    </Carousel>
               </p> -->
          </div>
          <div class="bg"></div>
          <!-- 商家信息 -->
          <div class="sellermsg">
              <div class="msgTitle">
                  <h3>商家信息</h3>
              </div>
              <ul>
                  <li v-for="(msg,s) in infos" :key="s">{{msg}}</li>
              </ul>
          </div>
    </div>
</template>

<script>
import { reqNum } from "../api/apis.js";

//引入swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        components: {
            swiper,
            swiperSlide
        },
        data(){
            return{
                value:0,
                name:'',//店名
                ratingCount:0,//已售数量
                sellCount:0,//月售
                score:0,
                minPrice:0,//起送价
                deliveryPrice:0,//配送价
                deliveryTime:0,//时间
                bulletin:'',
                supports:[],
                flag:true,
                pics:[],//商家图片数组
                value:0,
                infos:[],//商家信息数组

                //轮播配置
                swiperOption:{
                   autoplay: {
                        delay: 2000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true
                    },
                    slidesPerView:2,
                    loop : true
                }
            }
        },
        async created(){
            let res=await reqNum()
            let resdata=res.data.data
            this.name=resdata.name
            this.ratingCount=resdata.ratingCount
            this.sellCount=resdata.sellCount
            this.score=resdata.score
            this.minPrice=resdata.minPrice
            this.deliveryPrice=resdata.deliveryPrice
            this.deliveryTime=resdata.deliveryTime
            this.bulletin=resdata.bulletin
            this.supports=resdata.supports
            this.pics=resdata.pics
            this.infos=resdata.infos
        },
        computed:{
            //获取整数
            getInt(){
                return Math.floor(this.score)
            },
            //获取小数
            getFloat(){
                let num=this.score-Math.floor(this.score)
                return num>=0.5
            },

        }
       
    }
</script>

<style lang="less" scoped>
 .merchant{
     height:100%;
     .sellnum{
         height:200px;
          .selltop{
              height:100px;
              padding: 12px;
              display: flex;
              align-items: center;
              border-bottom: 1px solid #f1f1f1;
              .leftbox{
                  width:300px;
                  .sellimg{
                      display: flex;
                      align-items: center;
                      margin: 10px 0;
                      img{
                          width:10%;
                          margin-right:4px;
                      }
                      span{
                          margin-left:10px;
                      }
                  }
              }
              .rightbox{
                  width:100%;
                  display: flex;
                  flex-direction: column;
                  p{
                      text-align: right;
                      padding-right:20px;
                      &.icon-one{
                          font-size: 24px;
                          color: red;
                          padding-right:30px;
                      }
                  }
              }
          }
          .sellbottom{
              padding:15px;
              display: flex;
              justify-content: center;
              align-items: center;
              .item{
                  width: 33.33%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  border-right:2px solid #f1f1f1;
                  &.last-item{
                      border:none;
                  }
                  .pone{
                      font-size:18px;
                  }
              }
          }
     }
     .bg{
         height:24px;
         background: #f1f1f1;
         border-top:2px solid #d8d8d8;
         border-bottom:2px solid #d8d8d8;
     }
     .active-tell{
         padding: 14px;
            .active-title{
                border-bottom:1px solid #f1f1f1;
                h3{
                    margin-bottom:6px;
                }
                p{  
                    padding-bottom:10px;
                    text-indent:24px;
                    line-height: 24px;
                    color: red;
                }
            }
            ul{
                li{ 
                    height:50px;
                    line-height: 50px;
                    list-style: none;
                    border-bottom: 1px solid #f1f1f1;
                    img{
                        width:5%;
                        vertical-align: middle;
                        margin-right: 6px;
                    }
                }
            }
     }
     .sellerImg{
         height:200px;
         padding: 14px;
         .swiper-container{  
             width:100%;
             height:150px;
            //  display: flex;
             .swiper-wrapper{
                 .swiper-slide{
                //  width:100%;
                //  background-size:cover;
                    .demo-carousel{
                           display: flex;
                           justify-content: center;
                           align-items: center;
                            img{
                            width:150px;
                            height:150px;
                        }
                    }
                      
             }
              
             }
             
         }
     }
     .sellermsg{
         padding: 14px;
         .msgTitle{
             border-bottom: 1px solid #f1f1f1;
             h3{
                    margin-bottom:6px;
               }
         }
         ul{
             li{
                 height:50px;
                 line-height: 50px;
                list-style: none;
                border-bottom: 1px solid #f1f1f1;
             }
         }
            
     }
 }
</style>