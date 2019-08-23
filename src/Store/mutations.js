import {
    RECEIVE_ORDER,
    RECEIVE_SHOP,
    RECEIVE_USER,
    RECEIVE_GOODS,
    RECEIVE_CITYS
} from './mutations-types'
import Vue from 'vue'

export default {
    [RECEIVE_ORDER](state,{orderList}){
        state.orderList = orderList
    },

    [RECEIVE_SHOP](state,{shopList}){
        state.shopList = shopList
    },

    [RECEIVE_USER](state,{userList}){
        state.userList = userList
    },

    [RECEIVE_GOODS](state,{goodsList}){
        state.goodsList = goodsList
    },

    [RECEIVE_CITYS](state,{citys}){
        state.citys = citys
    }
}
