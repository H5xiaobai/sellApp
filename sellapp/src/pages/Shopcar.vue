<template>
    <div class="shorcar">
         <Row>
            <Col span="17">
                <Row>
                    <Col span="10">
                        <div class="outbox">
                            <div class="inbox" @click="clickcar">
                                <Icon type="md-cart" />
                            </div>
                        </div>
                        &yen;:{{gettotalprice}}
                    </Col>
                    <Col span="14">令需配送费&yen;20元</Col>
                </Row>
            </Col>
            <Col span="7"><span>&yen;20元起</span></Col>
         </Row>
        <!-- 购物车弹框 -->
         <div v-show="flag" class="outcar" slot="content">
            <h3 v-show="goodsNumselected.length==0">购物车空空如也</h3>
            <div v-for="(j,k) in goodsNumselected" :key="k">
                <Row>
                    <Col span="12" class="leftCol">
                        <p>{{j.name}}</p>
                    </Col>
                    <Col span="12" class="rightCol">
                    <Button  :size="sm" type="primary" shape="circle" icon='ios-remove' @click="clickNumDec(j.id)"></Button><span style="padding:4px">{{j.num}}</span><Button :size="sm" type="primary" shape="circle" icon='md-add' @click="clickNumAdd(j.id)"></Button>
                    </Col>
                </Row>
            </div>
        </div>                 
    </div>
</template>

<script>
    export default {
        data(){
            return{
               flag:false,//切换购物车弹框的显示与隐藏
               sm:'small'
            }
        },
        computed:{
           goodsNumselected(){
              return this.$store.getters.goodsNumselected
           }, 
          
           //计算总价
           gettotalprice(){
               let total=0;
               for(let food of this.$store.getters.goodsNumselected){
                    total+=food.price*food.num
               }
               return total
           }
          
        },
        methods:{
            clickcar(){
                this.flag=!this.flag
            },
             //商品数量减少
            clickNumDec(id){
                 this.$store.commit({
                     type:'changeNum',
                     num:-1,
                     id
                 })
                 
            },
            //商品数量增加
            clickNumAdd(id){
                 this.$store.commit({
                     type:'changeNum',
                     num:+1,
                     id
                 })
            },
        //   //    购物车数量
           showCar(){
               if(this.$store.getters.goodsNumselected.length == 0){
                   document.querySelector('.inbox').className='inbox'
               }
              for(let food of this.$store.getters.goodsNumselected){
                    
                    if(food.num>0){
                        document.querySelector('.inbox').className='inbox buyend'
                    }
               }
            
           },

        },
        updated(){
           this.showCar()
        }
    }
</script>

<style lang="less" scoped>
  .shorcar{
      height:60px;
      position: relative;
      .ivu-row{
          .ivu-col-span-17{
          height:60px;
          line-height: 60px;
          background-color: #121e25;
                .ivu-row{
                    display: flex;
                    align-items: center;
                    .ivu-col-span-10{
                        height:60px;
                        text-align: right;
                        padding-right:10px;
                         font-size: 18px;
                         color: #8f9495;
                         position: relative;
                         .outbox{
                             width:50px;
                             height:50px;
                             position: absolute;
                             left: 10px;
                             top:-8px;
                             border-radius:25px;
                             background: #121e25;
                             .inbox{
                                 width:40px;
                                 height:40px;
                                 line-height: 40px;
                                 text-align: center;
                                 border-radius: 20px;
                                 background-color: #2a343c;
                                 position:absolute;
                                 z-index:101;
                                 top:5px;
                                 left: 5px;
                                 font-size: 30px;
                                 //购物车激活样式
                                    &.buyend{
                                        background-color: #f60;
                                    }
                             }
                         }
                    }
                    .ivu-col-span-14{
                        height:40px;
                        line-height: 40px;
                        text-align: center;
                        border-left:2px solid #293439;
                         font-size: 14px;
                         color: #8f9495;
                    }
                }
          }
          .ivu-col-span-7{
          height:60px;
          line-height: 60px;
          text-align: center;
          font-size: 16px;
          color: #8f9495;
          font-weight:600;
          background-color: #2a353a;
          }
      }
      .outcar{
          width:100%;
          background-color: #fff;
          position: absolute;
          left:0;
          bottom:60px;
          h3{
              text-indent: 10px;
              font-size:18px;
          }
           .ivu-row{
                  margin:2px 0;
                  .ivu-col{
                      &.leftCol{
                          display: flex;
                          justify-content: center;
                          p{ 
                             font-size: 16px;
                             padding:10px;
                          }
                      }
                      &.rightCol{
                           padding: 10px;
                           display: flex;
                           justify-content: center;
                      }
                     
                  }      
              }
      }
      
  }
</style>