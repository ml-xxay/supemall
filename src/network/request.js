import axios from "axios";
// 第一种方式
// export function request(config, success, failure) { //config   别人给我传来的参数
//     // 1. 创建axios的实例
//     const instance = axios.create({
//             baseURL: 'http://123.207.32.32:8000',
//             timeout: 5000
//         })
//         // 要发网络请求  只有别人传来的config  真正传到实例里面  才可以完成真正的网络请求

//     instance(config)
//         .then(res => {
//             success(res) //通过success把得到res数据回调出去

//         }).catch(err => {
//             // console.log(err);
//             failure(err)
//         })

// }


//第二种方式   这种方式比较好
// export function request(config) {

//     return new Promise((resolve, reject) => {
//         //config   别人给我传来的参数
//         // 1. 创建axios的实例
//         const instance = axios.create({
//                 baseURL: 'http://123.207.32.32:8000',
//                 timeout: 5000
//             })
//             // 要发网络请求  只有别人传来的config  真正传到实例里面  才可以完成真正的网络请求

//         instance(config)
//             .then(res => {
//                 resolve(res) //通过resolve把得到res数据回调出去

//             }).catch(err => {
//                 // console.log(err);
//                 reject(err)
//             })
//     })
// }


//第三种  这种终极版   最好
export function request(config) {

    //config   别人给我传来的参数
    // 1. 创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    // 2. 请求拦截器
    // axios.interceptors //前面的axios是全局的   意思是拦截全局的axios  interceptors是拦截器的意思
    // 这里我们拦截用的那个网络请求实例 instance     request(请求的意思)
    instance.interceptors.request.use(config => {
            // 请求成功来这里   里面有参数什么得

            // console.log(config);
            return config //拦截的是config   要返回出去  要不然外面拿不到config数据  就会走err
        }, err => {
            // 请求失败来这里
            console.log(err);
        })
        //响应拦截
    instance.interceptors.response.use(res => {
            // console.log(res);
            return res.data //我们只要data  所以可以直接res.data
        }, err => {
            console.log(err);
        }) //response(响应)

    // 3.要发网络请求  只有别人传来的config  真正传到实例里面  才可以完成真正的网络请求
    return instance(config) //直接返回也是promise  所以就可以不用再下面.then.catch返回回调了
        // .then(res => {
        //     resolve(res) //通过success把得到res数据回调出去

    // }).catch(err => {
    //     // console.log(err);
    //     reject(err)
    // })

}