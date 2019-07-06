<template>
    <div class="goods">
              <!-- 左盒子 -->
             <div class="leftList">
                 <ul class="content">
                    <div v-for='(v,i) in goodsLsit'
                         :key='i'
                         :class="{leftTitle:true,selected:leftIndex==i}"
                         @click="clickList(i)"
                      >
                        {{v.name}}
                     </div>
                 </ul>
             </div>
             <!-- 右盒子 -->
             <div class="rightFoods"> 
                        <ul id="ulbox" class="content">
                                <div :id="index" v-for="(item,index) in goodsLsit" :key='index'>
                                <h4>{{item.name}}</h4> 
                                <div class="box" v-for="(j,k) in item.foods" :key='k'> 
                                    <Row>
                                        <Col span="6">
                                        <img :src="j.icon"/>
                                        </Col>
                                        <Col span="18">
                                            <h5>{{j.name}}</h5>
                                            <p>
                                            月售{{j.sellCount}}份
                                            好评率{{j.rating}}%
                                            </p>
                                            <p class="newprice">
                                                <Row>
                                                    <Col span="14">
                                                    <span>&yen;{{j.price}}</span><del>{{j.oldPrice}}</del>
                                                    </Col>
                                                    <Col span="10">
                                                    <Button  :size="sm" :class="{hidden:!j.num>0}" type="primary" shape="circle" icon='ios-remove' @click="clickNumDec(j.id)"></Button><span  :class="{hidden:!j.num>0}" style="padding:4px">{{j.num}}</span><Button :size="sm" type="primary" shape="circle" icon='md-add' @click="clickNumAdd(j.id)"></Button>
                                                    </Col>
                                                </Row>
                                            </p>
                                        </Col>
                                    </Row> 
                                   </div>
                                 </div>
                        </ul>
            </div>
    </div>
</template>

<script>
import {reqMenu} from '../api/apis.js'
//引入滚动插件
import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                // menus:[],
                leftIndex:0,//定义一个当前左侧菜单的索引
                sm:'small',
                heightArr:[]//定义高度的数组
            }
        },
        created(){
            //初始化请求数据
            this.$store.dispatch('initlist')
        },
    //    async created(){
    //         let menu=await reqMenu()
    //         let menudata=menu.data.data
    //         // console.log(menudata);
    //         this.menus=menudata
            
    //     },
        mounted(){
             //左边菜单滚动条
            // let leftscroll=document.querySelector('.leftList')
            // let listscroll=new BScroll(leftscroll)
            this.listscroll=new BScroll(".leftList",{
                click:true //派发点击事件
            })
            //初始右边的滚动条
            this.rightscroll=new BScroll('.rightFoods',{
                probeType:3,  //派发滚轮事件
                 click:true 
            })
            //滚轮事件监听，获取当前高度
            this.rightscroll.on("scroll",obj=>{
                //转换绝对值
                 let _y=Math.abs(obj.y)
                // console.log(_y);
                 if(_y<this.heightArr[0]){//如果当前高度小于第一个高度就固定把他的索引设为0
                      this.leftIndex=0
                 }else{
                     //其他菜单栏格子
                     let totalHeight=0;
                     for(let i=0;i<this.heightArr.length;i++){
                            let height=this.heightArr[i]
                             totalHeight+=height 
                           if(_y>=totalHeight){
                              this.leftIndex=i+1
                           }
                     }
                 }
            })
        },
        updated(){
            //性能优化
            if(this.heightArr.length==0){
                    let ulbox=document.getElementById('ulbox')
                    // console.log(rightbox);
                    for(let elt of ulbox.childNodes){
                        this.heightArr.push(elt.offsetHeight)
                    }
                    // console.log(this.heightArr);(9) [978, 114, 114, 306, 210, 210, 306, 498, 594]
            }
           
        },
        methods:{
            clickList(i){
                //用户点击的索引
                this.leftIndex=i
                // console.log(this.leftIndex)
                 //滚动到目标元素
                this.rightscroll.scrollToElement(document.getElementById(i), 300);
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
            }
        },
        computed:{
            //拿回食品数据，但是现在是一个空数组，必须初始化
            goodsLsit(){
                return this.$store.state.list
            }
        }
    }
</script>

<style lang="less" scoped>
.goods{
    height:400px;
    border-top:1px solid #ccc;
    display: flex;
    .leftList{
        width:100px;
        background-color: #f1f1f1;
        overflow: auto;
        .leftTitle{
            height:50px;
            display: flex;
            align-items: center;
            padding:10px;
            border-bottom:1px solid #f3f3f3;
        }
    }
    .rightFoods{
        width:100%;
        overflow:auto;
        .content{
             h4{
                 text-indent: 10px;
                 padding:2px 0;
                 background-color: #f1f1f1;
             }
            .box{
                .ivu-row{
                    padding: 10px;
                        .ivu-col{
                            img{
                                width:80%;
                            }
                        }
                        &:last-child{
                            h5{font-size:16px;}
                            .newprice{
                                .ivu-row{
                                    .ivu-col{
                                        &:first-child{
                                            color: red;
                                            font-size: 16px;
                                            font-weight: 500;
                                        }
                                    }
                                    &>.ivu-col:last-child{
                                         .hidden{
                                             visibility: hidden;
                                         }
                                    }
                                }
                                
                                
                            }
                        }
                }
           } 
        }
        
        
        
    }
    //激活样式
    .selected{
        background-color:#fff;
    }
}

</style>