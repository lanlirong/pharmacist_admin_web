<template>
    <div id="app">
        <div class="home" v-if="$route.fullPath !== '/login'">
            <v-head></v-head>
            <v-sidebar></v-sidebar>
            <div class="content-box" :class="{ 'content-collapse': collapse }">
                <v-tags></v-tags>
                <div class="content">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                    <el-backtop target=".content"></el-backtop>
                </div>
            </div>
        </div>
        <router-view v-else></router-view>
    </div>
</template>
<script>
import vHead from '@/views/layout/Header.vue';
import vSidebar from '@/views/layout/Sidebar.vue';
import vTags from '@/views/layout/Tags.vue';
import bus from '@/utils/bus';
export default {
    data() {
        return {
            collapse: false,
            tagsList: []
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    watch: {},
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
