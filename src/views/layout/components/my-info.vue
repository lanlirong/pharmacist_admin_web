<template>
    <div class="my-info">
        <ul>
            <li>
                <span class="label">名字:</span>
                <span class="value">{{ userInfo.name | placeholder }}</span>
            </li>
            <li>
                <span class="label">密码:</span>
                <span class="value" v-if="passwordVisible">{{ userInfo.password | placeholder }}</span>
                <span class="value" v-else>******</span>
                <span class="el-icon-view" @click="passwordVisible = !passwordVisible"></span>
            </li>
            <li>
                <span class="label">账号:</span>
                <span class="value">{{ userInfo.username | placeholder }}</span>
            </li>
            <li>
                <span class="label">性别:</span>
                <span class="value">{{ userInfo.sex | placeholder }}</span>
            </li>
            <li>
                <span class="label">角色:</span>
                <span class="value">{{ userInfo.role | placeholder }}</span>
            </li>
            <li>
                <span class="label">电话:</span>
                <span class="value">{{ userInfo.phone | placeholder }}</span>
            </li>
            <li>
                <span class="label">邮箱:</span>
                <span class="value">{{ userInfo.email | placeholder }}</span>
            </li>
        </ul>
        <div class="picture">
            <img :src="userInfo.avator" alt="" :onerror="defaultImg" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'myInfo',
    data() {
        return {
            userInfo: {},
            defaultImg: 'this.src="' + require('@/assets/img/default.png') + '"',
            passwordVisible: false
        };
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser() {
            if (localStorage.getItem('userInfo')) this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
    }
};
</script>
<style lang="less" scoped>
.my-info {
    display: flex;
    .picture {
        width: 80px;
        height: 80px;
        img {
            width: 100%;
            height: 100%;
            text-align: center;
        }
    }
    ul {
        flex: 1;
        padding-left: 14px;
        li {
            font-size: 14px;
            display: inline-block;
            width: 50%;
            // height: 35px;
            line-height: 35px;
            .label {
                color: rgba(0, 0, 0, 0.85);
                font-weight: 400;
                padding-right: 5px;
            }
            .value {
                color: rgba(0, 0, 0, 0.65);
                margin-right: 5px;
            }
        }
    }
}
</style>
