<template>
    <div class="admin-user-detail">
        <el-avatar :src="detail.avatar"></el-avatar>
        <ul v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
            <li>
                <div class="label">ID:</div>
                <div class="value">{{ detail.id | placeholder }}</div>
            </li>
            <li>
                <div class="label">名字:</div>
                <div class="value">{{ detail.name | placeholder }}</div>
            </li>
            <li>
                <div class="label">账号:</div>
                <div class="value">{{ detail.username | placeholder }}</div>
            </li>
            <li>
                <div class="label">密码:</div>
                <div class="value">{{ detail.password | placeholder }}</div>
            </li>
            <li>
                <div class="label">性别:</div>
                <div class="value">{{ detail.sex | placeholder }}</div>
            </li>

            <li>
                <div class="label">邮箱:</div>
                <div class="value">{{ detail.mail | placeholder }}</div>
            </li>
            <li>
                <div class="label">电话:</div>
                <div class="value">{{ detail.phone | placeholder }}</div>
            </li>
            <li>
                <div class="label">创建时间:</div>
                <div class="value">{{ detail.createTime | placeholder }}</div>
            </li>
            <li>
                <div class="label">创建人:</div>
                <div class="value">{{ detail.creator | placeholder }}</div>
            </li>
            <li>
                <div class="label">更新时间:</div>
                <div class="value">{{ detail.updateTime | placeholder }}</div>
            </li>
            <li>
                <div class="label">角色:</div>
                <div class="value">{{ detail.role | placeholder }}</div>
            </li>
            <li></li>
            <li>
                <div class="label">权限:</div>
            </li>
            <div class="limit-container">
                <el-tag type="danger" v-for="(item, index) in detail.limits" :key="index">{{ item }}</el-tag>
            </div>
        </ul>
    </div>
</template>

<script>
import { _getDetail } from '@/services/api/admin-user';
export default {
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            detail: {},
            loading: false
        };
    },
    created() {
        this.getDatail();
    },
    mounted() {},
    methods: {
        async getDatail() {
            this.loading = true;
            const { code, data } = await _getDetail({ id: this.id });
            if (code == 1) {
                this.detail = data;
                this.loading = false;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.admin-user-detail {
    position: relative;
    .el-avatar {
        position: absolute;
        top: 0px;
        right: 40px;
    }
    ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
            width: 50%;
            display: flex;
            margin-bottom: 10px;
            .label {
                width: 80px;
            }
            .value {
                text-align: left;
            }
        }
    }
    .limit-container {
        margin-left: 80px;
        .el-tag {
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }
}
</style>
