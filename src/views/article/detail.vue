<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <h1>{{ detail.title }}</h1>
        <div class="content-container" v-html="detail.content"></div>
        <!-- 审核按钮 -->
        <div class="check-btns" v-if="$route.query.raw != 1 && $route.query.raw != 0">
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

<style lang="less">
.detail {
    overflow: scroll;
    position: relative;
    h1 {
        width: 100%;
        // margin-bottom: 20px;
        font-size: 20px;
        font-weight: 700;
        color: @theme-color-1;
        text-align: center;
        position: relative;
    }
    .content-container {
        overflow: scroll;
        height: 100%;
        line-height: 1.5em;
        blockquote {
            border-left: 4px solid #ccc;
            margin-bottom: 5px;
            margin-top: 5px;
            padding-left: 16px;
        }
        ol {
            padding-left: 1.5em;
            li {
                counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
                counter-increment: list-0;
            }
            li:not(.ql-direction-rtl)::before {
                margin-left: -1.5em;
                margin-right: 0.3em;
                text-align: right;
            }
            li:before {
                content: counter(list-0, decimal) '. ';
                display: inline-block;
                white-space: nowrap;
                width: 1.2em;
            }
        }
        ul {
            padding-left: 1.5em;
            li:not(.ql-direction-rtl)::before {
                content: '\2022';
                margin-left: -1.5em;
                margin-right: 0.3em;
                text-align: right;
                display: inline-block;
                white-space: nowrap;
                width: 1.2em;
            }
            li:not(.ql-direction-rtl) {
                padding-left: 1.5em;
            }
        }
        .ql-indent-1 {
            padding-left: 3em;
        }
        .ql-indent-2 {
            padding-left: 6em;
        }
        .ql-indent-3 {
            padding-left: 9em;
        }
        .ql-indent-4 {
            padding-left: 12em;
        }
        .ql-indent-5 {
            padding-left: 15em;
        }
        h2 {
            font-weight: 700;
            font-size: 18px;
        }
        h3 {
            font-weight: 500;
            font-size: 16px;
        }
        h4 {
            font-weight: 400;
            font-size: 14px;
        }
        img {
            width: unset;
            max-width: 100%;
        }
    }

    .check-btns {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
}
</style>
