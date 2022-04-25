import {
    ADD_COUNTER, //可以用这个常量来代替addCounter
    ADD_TO_CART, //可以用这个常量来代替addTOCart

} from './mutation-types'

export default {
    // addCounter(state, payload) {
    //     payload.count++

    // },
    // addTOCart(state, payload) {
    //     state.cartList.push(payload)
    // }
    [ADD_COUNTER](state, payload) {
        payload.count++

    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true //默认全部选中
        state.cartList.push(payload)
    }
}