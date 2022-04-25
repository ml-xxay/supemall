import Toast from './Toast'

const obj = {}
    // vue  是可以传过来的
obj.install = function(Vue) {

    // document.body.appendChild(Toast.$el) //把Toast组建的元素  添加到body里面  这种方式不行 但思路是对的

    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)
        // 2.new 的方式,根据组件构造器,可以创建出来一个组件对象
    const toast = new toastContrustor
        // 3. 将组件对象  手动挂载到某一个元素上
    toast.$mount(document.createElement('div')) //document.createElement('div')  自己创建一个div  挂载到toast上

    //4.toast.$el对应的就是刚才创建的div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj