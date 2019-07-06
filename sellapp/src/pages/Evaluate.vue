<template>
    <div class="evaluate">
        <!-- 评分 -->
         <div class="evaluate-top">
               <div class="leftbox">
                    <p class="total">{{score}}</p>
                    <p>综合评分</p>
                    <p class="plast">电位器</p>
               </div>
               <div class="rightbox">
                    <p class="serve">服务总分<img v-for="(i,k) in getInt" :key='k' src="../assets/images/star36_on@2x.png"><img src="../assets/images/star36_off@2x.png"><span>{{score}}</span></p>
                    <p class="manner">服务态度<img v-for="(j,a) in getserve" :key="a" src="../assets/images/star36_on@2x.png"><img src="../assets/images/star36_off@2x.png"><span>{{serviceScore}}</span></p>
                    <p class="totime">送达时间<span>44分钟</span></p>
               </div>
         </div>
         <div class="midbox"></div>
         <div class="classify">
             <!-- 上 -->
             <div class="classifybtn">
                 <Button type="primary" class="btn">全部</Button>
                 <Button type="info" class="btn">满意</Button>
                 <Button type="error" class="btn">不满意</Button>
             </div>
             <!-- 下 -->
             <div class="classSelect">
                 <p><Button shape="circle" icon="md-checkmark" :size="sm"></Button><span>只看有内容的评价</span></p>
             </div>
         </div>
         <!-- 评论 -->
         <div class="evaluateBottom">
              <ul class="content">
                    <div class="evaluatebox"
                   v-for="(item,index) in strArr"
                  :key="index"
                  >
                        <Row type="flex" justify="start" class="code-row-bg">
                                <Col span="4" class="headphoto">
                                    <img :src=item.avatar>
                                </Col>
                                <Col span="20">
                                    <h3 class="curtime">{{item.username}}<span>{{item.rateTime|filterTime}}</span></h3>
                                    <p class="score"><img v-for="(k,i) in item.score" :key="i" src="../assets/images/star36_on@2x.png"><img v-for="(j,a) in getInttwo(item.score)" src="../assets/images/star36_off@2x.png"><span>{{item.deliveryTime}}分钟送达</span></p>
                                    <p class="lsp">{{item.text}}</p>
                                </Col>
                                
                        </Row>
                    </div>
              </ul>
              
         </div>
    </div>
</template>

<script>
import {reqNum,evaluateReq} from '../api/apis'
import moment from 'moment'
//引入滚动插件
import BScroll from 'better-scroll'
    export default {
        data(){
            return{
               score:0,
               serviceScore:0,
               sm:"small" ,
               strArr:[],//定义一个评论对象的数组
            //    scoreArr:[],//定义一个空数组保存所有分数
            }
        },
       async created(){
           let res=await reqNum()
           let resdata=res.data.data
           this.score=resdata.score
           this.serviceScore=resdata.serviceScore

           //评论语言
           let result=await evaluateReq()
        //    console.log(result.data.data);
           this.strArr=result.data.data
        //    for(let v of this.strArr){
        //        this.scoreArr.push(v.score)
        //    }
          
        },
        computed:{
            //整数
            getInt(){
               return Math.floor(this.score)
            },
            //
            getserve(){
               return Math.floor(this.serviceScore)
            },
           
        },
        filters:{
            filterTime(curtime){
                return moment(curtime).format('YYYY-MM-DD hh:mm')
            }
        },
        methods:{
              //评论
            getInttwo(score){
                let n=5
                let i=Math.round(n-score)
                return i
            }
        },
        mounted(){
            this.evaluateBottomscroll=new BScroll('.evaluateBottom')
        }
    }
</script>

<style lang="less" scoped>
   .evaluate{
       height:100%;
       .evaluate-top{
           width:100%;
           height:30%;
           border-top:1px solid #f1f1f1;
           border-bottom: 1px solid #f1f1f1;
           display: flex;
           .leftbox{
               width:220px;
               height:30%;
               padding: 10px;
               display: flex;
               flex-direction: column;
               align-items: center;
               border-right:1px solid #f1f1f1;
               p{  
                   &.total{
                       font-size:24px;
                   }
                   font-size:14px;
                   margin-bottom: 6px;
                   &.plast{
                       font-size:14px;
                       color:#ccc;
                   }
               }
              
           }
           .rightbox{
               width:100%;
               height:30%;
               padding: 10px;
               display: flex;
               flex-direction: column;
               align-items: left;
                p{ 
                   display: flex;
                   align-items: center;
                   font-size:14px;
                   margin-bottom: 11px;
                   &.serve{
                       span{
                           margin-left: 10px;
                       }
                   }
                   &.manner{
                       span{
                           margin-left: 10px;
                       }
                   }
                   &.totime{
                       span{
                           font-size:14px;
                           margin-left: 10px;
                           color: #ccc;
                       }
                   }
                    img{
                       width:8%;
                       margin-right:6px;
                   }
                }
           }
       }
       .midbox{
           height:20px;
           background:#f1f1f1;
       }
       .classify{
           .classifybtn{
               display: flex;
               border-bottom: 1px solid #f3f3f3;
               padding: 15px;
                  .btn{
                      margin-right:10px;
                  }
           }
           .classSelect{
               padding: 15px;
               border-bottom: 1px solid #ccc;
               p{
                   span{
                       margin-left: 10px;
                       color: #ccc
                   }
               }
           }
       }
       .evaluateBottom{
           height:300px;
           overflow:auto;
           padding: 10px;
           .content{
                 .evaluatebox{
                        padding-top:12px;
                        border-bottom:1px solid #f1f1f1;
                        .code-row-bg{
                            height: 100px;
                            .headphoto{
                                text-align: center;
                                img{
                                    width:60%;
                                    border-radius:50%;
                                }
                            }
                            &:last-child{
                                p{
                                    margin-bottom: 10px;
                                    &.lsp{
                                        font-size:14px;
                                        font-weight:bold;
                                    }
                                    &.score{
                                        img{
                                            width:4%;
                                        }
                                    }
                                }
                                .curtime{
                                    display: flex;
                                    justify-content:space-between;
                                    font-size: 16px;
                                    span{
                                        font-size:14px;
                                        font-weight: normal;
                                        color: #ccc;
                                    }
                                }
                            }
                        }
                }
           }
          
       }
   }
</style>