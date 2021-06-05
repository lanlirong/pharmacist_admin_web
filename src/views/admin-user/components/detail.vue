<template>
    <div class="admin-user-detail">
        <el-avatar :src="data.avatar"></el-avatar>
        <ul>
            <li>
                <div class="label">ID:</div>
                <div class="value">{{ data.id }}</div>
            </li>
            <li>
                <div class="label">名字:</div>
                <div class="value">{{ data.name }}</div>
            </li>
            <li>
                <div class="label">账号:</div>
                <div class="value">{{ data.username }}</div>
            </li>
            <li>
                <div class="label">密码:</div>
                <div class="value">{{ data.password }}</div>
            </li>
            <li>
                <div class="label">性别:</div>
                <div class="value">{{ data.sex }}</div>
            </li>

            <li>
                <div class="label">邮箱:</div>
                <div class="value">{{ data.mail }}</div>
            </li>
            <li>
                <div class="label">电话:</div>
                <div class="value">{{ data.phone }}</div>
            </li>
            <li>
                <div class="label">创建时间:</div>
                <div class="value">{{ data.createTime }}</div>
            </li>
            <li>
                <div class="label">创建人:</div>
                <div class="value">{{ data.creator }}</div>
            </li>
            <li>
                <div class="label">更新时间:</div>
                <div class="value">{{ data.updateTime }}</div>
            </li>
            <li>
                <div class="label">角色:</div>
                <div class="value">{{ data.role }}</div>
            </li>
            <li></li>
            <li>
                <div class="label">权限:</div>
                <div class="value">{{ data.limit }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {};
    },
    created() {
        console.log(this.data);
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
}
</style>
