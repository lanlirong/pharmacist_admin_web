<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <div class="title">{{ detail.name }} --> {{ detail.interaction }}</div>
        <h2>基本信息</h2>
        <div class="basic-container">
            <ul>
                <li>
                    <span class="label">作用ID:</span>
                    <span class="value">{{ detail.id | placeholder }}</span>
                </li>
                <li>
                    <span class="label">作用结果:</span> <span class="value">{{ detail.result | placeholder }}</span>
                </li>
                <li>
                    <span class="label">临床建议:</span>
                    <span class="value">{{ detail.suggest | placeholder }}</span>
                </li>
                <li>
                    <span class="label">临床证据:</span> <span class="value">{{ detail.evidence | placeholder }}</span>
                </li>
                <li>
                    <span class="label">证据级别:</span>
                    <span class="value">
                        <el-tag type="danger" v-if="detail.level">{{ detail.level }}</el-tag>
                        <span v-else>---</span>
                    </span>
                </li>
            </ul>
        </div>

        <h2>参考文献</h2>
        <ul class="introduction">
            <li v-if="detail.reference1">
                <span class="label"><i class="el-icon-star-on"></i> </span>
                <span class="value">{{ detail.reference1 | placeholder }}</span>
            </li>
            <li v-if="detail.reference2">
                <span class="label"><i class="el-icon-star-on"></i> </span>
                <span class="value">{{ detail.reference2 | placeholder }}</span>
            </li>
            <li v-if="detail.reference3">
                <span class="label"><i class="el-icon-star-on"></i> </span>
                <span class="value">{{ detail.reference3 | placeholder }}</span>
            </li>
            <li v-if="detail.reference4">
                <span class="label"><i class="el-icon-star-on"></i> </span>
                <span class="value">{{ detail.reference4 | placeholder }}</span>
            </li>
            <li v-if="detail.reference5">
                <span class="label"><i class="el-icon-star-on"></i> </span>
                <span class="value">{{ detail.reference5 | placeholder }}</span>
            </li>
        </ul>

        <h2>系统信息</h2>
        <ul class="systerm-info">
            <li>
                <span class="label">创建时间:</span>
                <span class="value">{{ detail.createTime | placeholder }}</span>
            </li>
            <li>
                <span class="label">更新时间:</span>
                <span class="value">{{ detail.updateTime | placeholder }}</span>
            </li>
            <li></li>
            <li>
                <span class="label">创建人:</span>
                <span class="value">{{ detail.creator | placeholder }}</span>
            </li>
            <li>
                <span class="label">审核人:</span>
                <span class="value">{{ detail.reviewer | placeholder }}</span>
            </li>
        </ul>
        <!-- 审核按钮 -->
        <div class="check-btns">
            <el-button :disabled="isCheck" type="danger" @click="check(false)">不通过</el-button>
            <el-button :disabled="isCheck" type="success" @click="check(true)">通过</el-button>
        </div>
    </card>
</template>
<script>
import { _getRawDetail, _check } from '@/services/api/interaction';
export default {
    name: 'interactionDetail',
    data() {
        return {
            detail: {},
            loading: false
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
                    const { data } = await _getRawDetail({ id: this.$route.query.id });
                    this.detail = data;

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
                    this.$router.replace('/interaction/check');
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
    .title {
        margin: 20px 0;
    }
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
                width: 100%;
                max-width: 1000px;
            }
        }
    }
    .introduction {
        li {
            max-width: 1000px;
            width: 100%;
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
