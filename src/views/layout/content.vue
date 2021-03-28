<template>
    <div class="content-container">
        <keep-alive :include="tagsList">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import bus from '@/utils/bus';

export default {
    name: 'contentBox',
    data() {
        return {
            tagsList: []
        };
    },
    watch: {
        $route: {
            handler: function() {
                bus.$on('tags', msg => {
                    let arr = [];
                    for (let i = 0, len = msg.length; i < len; i++) {
                        msg[i].level == 2 && msg[i].name && arr.push(msg[i].name);
                    }
                    this.tagsList = arr;
                    // console.log(this.tagsList, 2);
                });
            },
            deep: true
            // immediate: true
        }
    },
    mounted() {
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
            console.log(this.tagsList, 2);
        });
    }
};
</script>
