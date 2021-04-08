<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <h1>{{ detail.title }}</h1>
        <div class="content-container" v-html="detail.content"></div>
        <!-- 审核按钮 -->
        <div class="check-btns" v-if="$route.query.raw == 1">
            <el-button :disabled="isCheck" type="danger" @click="check(false)">不通过</el-button>
            <el-button :disabled="isCheck" type="success" @click="check(true)">通过</el-button>
        </div>
    </card>
</template>
<script>
import { _getRawDetail, _check, _getDetail } from '@/services/api/article';
export default {
    name: 'drugCheckDetail',
    data() {
        return {
            detail: {},
            loading: false,
            isCheck: false
        };
    },
    mounted() {
        this.getDetail();
    },
    methods: {
        async getDetail() {
            if (this.$route.query.id) {
                this.loading = true;
                try {
                    if (this.$route.query.raw == 1) {
                        const { data } = await _getRawDetail({ id: this.$route.query.id });
                        this.detail = data;
                    } else {
                        const { data } = await _getDetail({ id: this.$route.query.id });
                        this.detail = data;
                    }

                    this.loading = false;
                } catch (error) {
                    this.loading = false;
                }
            }
        },
        async check(val) {
            this.isCheck = true;
            try {
                let status = val ? 1 : 2;
                const { code } = await _check({ status, id: this.$route.query.id });
                if (code == 1) {
                    this.$message.success('审核成功');
                    this.$router.replace('/article/check');
                } else {
                    this.$message.danger('审核失败');
                }
                this.isCheck = false;
            } catch (error) {
                this.isCheck = false;

                console.log(error);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.detail {
    overflow: scroll;
    position: relative;
    h2 {
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        border-left: 4px solid red;
        padding-left: 10px;
        margin-bottom: 10px;
    }
    ul {
        padding-left: 14px;
        margin-bottom: 20px;
        li {
            font-size: 14px;
            display: inline-block;
            // height: 35px;
            line-height: 35px;
            .label {
                color: rgba(0, 0, 0, 0.85);
                font-weight: 400;
                padding-right: 5px;
            }
            .value {
                color: rgba(0, 0, 0, 0.65);
            }
        }
    }
    .basic-container {
        display: flex;
        ul {
            flex: 1;
            li {
                width: 33%;
            }
        }
        .picture {
            width: 200px;
            border: @border;
            padding: 10px;
            img {
                width: 100%;
                height: 100%;
                text-align: center;
            }
        }
    }
    .main-disease {
        height: 30px;
        margin-bottom: 20px;
        .el-link {
            margin: 0 10px;
        }
    }
    .treat-info,
    .manufacturer-info {
        li {
            width: 100%;
            line-height: 24px;
            margin-bottom: 10px;
            .label {
                width: 100px;
                float: left;
            }
            .value {
                display: block;
                margin-left: 100px;
            }
        }
    }
    .systerm-info {
        li {
            width: 33%;
        }
    }
    .check-btns {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
}
</style>
