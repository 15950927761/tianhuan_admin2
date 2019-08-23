<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <!--include 使该标签作用于所有name属性的值跟此标签 include的属性值一致的vue页面-->
                    <keep-alive :inclue="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header'
    import vSidebar from './Sidebar'
    import vTags from './Tags'
    import bus from './bus'
    export default {
        data(){
            return {
                tagsList:[],
                collapse:false
            }
        },
        components:{
            vHead,vSidebar,
            vTags
        },
        created(){
            bus.$on('collapse',msg=>{
                this.collapse = msg
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags',msg=>{
                let arr = [];
                for(let i = 0;i < msg.length;i ++){
                    msg[i].name && arr.push(msg[i].name)
                }
                this.tagsList = arr
            })

        }
    }
</script>

<style>
.content-box{
    background:#fff;
}
</style>
