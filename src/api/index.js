// 包含n个接口请求函数的模块
import ajax from './ajax'
const BASE_URL ='/api'

//获取订单用户列表
export const reqOrderList = () => ajax('/orderList')
//获取商家列表
export const reqShopList = () =>ajax('/shopList')
//获取会员列表
export const reqUserList = () =>ajax('/userList')
//获取商品列表
export const reqGoodsList = () => ajax('/goodsList')
