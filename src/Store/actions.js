import {
    RECEIVE_ORDER,
    RECEIVE_SHOP,
    RECEIVE_USER,
    RECEIVE_GOODS,
    RECEIVE_CITYS
} from './mutations-types'
import {
    reqGoodsList,
    reqOrderList,
    reqShopList,
    reqUserList,
    reqCitys
} from '../api/index'

export default {
    async getOrder({commit},callback){
        const result = await reqOrderList()
        // console.log(result);
        const orderList = result.orderArr
        commit(RECEIVE_ORDER,{orderList})
        callback && callback()
    },

    async getShop({commit},callback){
        const result = await reqShopList()
        // console.log(result)
        const shopList = result.shopArr
        commit(RECEIVE_SHOP,{shopList})
        callback && callback()
    },

    async getUser({commit},callback){
        const result = await reqUserList()
        // console.log(result)
        const userList = result.userArr
        commit(RECEIVE_USER,{userList})
        callback && callback()
    },

    async getGoods({commit},callback){
        const result = await reqGoodsList()
        console.log(result)
        const goodsList = result.goodArr
        commit(RECEIVE_GOODS,{goodsList})
        callback && callback()
    },

    async getCitys({commit},callback){
        const result = await reqCitys()
        console.log(result);
    }

}
