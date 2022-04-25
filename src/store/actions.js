import {
    ADD_COUNTER, //可以用这个常量来代替addCounter  
    ADD_TO_CART, //可以用这个常量来代替addTOCart

} from './mutation-types'

export default {
    addCart(context, payload) {
        return new Promise((resolve) => {
            // 查找数组中是否有该商品
            // let oldProduct = null
            // for (const item of cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }
            // 查找数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            if (oldProduct) {
                // oldProduct.count += 1

                context.commit(ADD_COUNTER, oldProduct)
                    // context.commit('addCounter', oldProduct)
                    // ADD_COUNTER 指向 addCounter
                resolve('当前商品数量加1')
            } else {
                payload.count = 1
                    // context.state.cartList.push(payload)
                    // 把商品添加进去   payload是商品
                context.commit(ADD_TO_CART, payload)
                    // context.commit('addTOCart', payload) ADD_TO_CART指向ADD_TO_CART
                resolve('加入购物车成功')
            }
        })
    }
}