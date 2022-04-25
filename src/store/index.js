import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations" //把mutations抽出去的导进来
import actions from "./actions"
import getters from "./getters"

import createPersistedState from "vuex-persistedstate"; // 持久化插件
//1. 安装插件
// Vue.use(Vue)
Vue.use(Vuex)

const state = {
    cartList: []
}


//2. 创建Store对象
const store = new Vuex.Store({
    // state  是保存状态的  相当与组件里面的data数据
    state: state,
    //mutations记录修改状态的  主修改  通过commit调用mutations   
    // /mutations 中的每个方法尽可能完成的事件比较单一一点   所以把addCart放在actions里
    mutations: mutations,
    // actions 是行为  是操作异步的  context 默认参数
    actions: actions,

    // // 类似于组件里面的计算属性
    getters: getters,

    // //模块
    // modules: {
    //     //这个a  最终会放在state里面
    //     a: modulesA
    // }


    // 数据持久化,刷新之后页面数据不会的丢失
    /* vuex数据持久化配置 */
    plugins: [
        createPersistedState({
            // 存储方式：localStorage、sessionStorage、cookies
            // storage: window.sessionStorage,
            storage: window.localStorage,
            // 存储的 key 的key值
            key: "store",
            render(state) {
                // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
                return {...state }; //相当于  return {state:state.cartList}
                // ...state  就是遍历了state参数对象中的所有可遍历属性，拷贝到当前设置的key中
            }
        })
    ]
})

// 3.导出store对象
export default store