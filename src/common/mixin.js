// 混入 

import { debounce } from "common/utils.js" //防抖
import BackTop from "components/content/backTop/BackTop"; //返回顶部图标
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.refresh, 50);
        this.itemImgListener = () => {
            this.refresh() //调用防抖刷新
        }
        this.$bus.$on("itemImageLoad", this.itemImgListener); //监听itemImageLoad  调用this.itemImgListener
        console.log("我是混入");
    },
}

//封装回到顶部 
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            //返回顶部图标
            isshowBackTop: false,
        }
    },
    methods: {
        // 返回顶部方法
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 1500);
        },
        demo(position) {
            this.isshowBackTop = (-position.y) > 1000;
        }
    }
}