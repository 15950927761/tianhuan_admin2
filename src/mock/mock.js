const Mock = require('mockjs')
const Random = Mock.Random;

const orderList = function(){
    let orderArr = [];
    for(let i = 0;i < 60;i ++){
        let minObject = {
            orderId:Random.integer(1000000,9999999),
            name:Random.cname(),
            date:Random.datetime(),
            address:Random.county(true),
            money:Random.integer(50,20000),
            status:'已支付'
        }
        orderArr.push(minObject)
    }
    return {
        orderArr:orderArr
    }
}

const shopList = function(){
    let shopArr = [];
    for(let i = 0;i < 80;i ++){
        let minObject = {
            shopId:Random.integer(1000000,9999999),
            shopname:Random.name(),
            shopcode:Random.character(),
            address:Random.province(),
            shoplevel:'非托用户',
            shopclass:'普通用户',
            date:Random.datetime(),
            shopcontent:Random.paragraph(2, 5)
        }
        shopArr.push(minObject)
    }
    return {
        shopArr:shopArr
    }
}

const userList = function(){
    let userArr = [];
    for(let i = 0;i < 80;i ++){
        let minObject = {
            userId:Random.integer(1000000,9999999),
            username:Random.name(),
            address:Random.province(),
            date:Random.datetime()
        }
        userArr.push(minObject)
    }
    return {
        userArr:userArr
    }
}

const goodsList = function(){
    let goodArr = [];
    for(let i = 0;i < 80;i ++){
        let minObject = {
            goodId:Random.integer(1000000,9999999),
            goodname:Random.name(),
            goodclass:'调理方便菜',
            goodbrand:'嘉禾',
            price:Random.integer(),
            number:Random.integer(),
            date:Random.datetime(),
            status:'出售中',
            shopname:'伟创艺食品',
            shopClass:'加盟店',
            address:Random.province(),
            descrption:Random.paragraph(1,2)
        }
        goodArr.push(minObject)
    }
    return {
       goodArr:goodArr
    }
}



Mock.mock('/orderList','get',orderList)
Mock.mock('/shopList','get',shopList)
Mock.mock('/userList','get',userList)
Mock.mock('/goodsList','get',goodsList)
