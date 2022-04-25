// 封装所有首页的请求  这样做耦合度很低  首页直接引用requert 会和其他代码耦合在一起 不好

// 第一步导入封装请求模块 
import { request } from "./request";

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
// 流行 新款 精选 数据的请求
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}