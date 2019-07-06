import axios from 'axios';

let IP='http://127.0.0.1:888'

//商家
export function reqNum(){
    return axios.get(IP+'/api/seller')
}
//商品
export function reqMenu(){
    return axios.get(IP+'/api/goods')
}
//评价
export function evaluateReq(){
    return axios.get(IP+'/api/ratings')
}