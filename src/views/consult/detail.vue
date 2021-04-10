<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <h2>基本信息</h2>
        <div class="basic-container">
            <ul>
                <li>
                    <span class="label">问题ID:</span>
                    <span class="value">{{ detail.id | placeholder }}</span>
                </li>
                <li>
                    <span class="label">问题内容:</span> <span class="value">{{ detail.Q_content | placeholder }}</span>
                </li>
                <li>
                    <span class="label">问题类型:</span>
                    <span class="value">
                        <el-tag type="warning">
                            {{ detail.K_type | placeholder }}
                        </el-tag>
                    </span>
                </li>
            </ul>
        </div>
        <h2>知识链接</h2>
        <ul class="introduction">
            <li>
                <span class="label"><i class="el-icon-star-on"></i> </span>
                <span class="value">{{ detail.K_link | placeholder }}</span>
            </li>
        </ul>
        <h2>问题回答</h2>
        <ul class="introduction">
            <li>
                <span class="label"><i class="el-icon-star-on"></i> </span>
                <span class="value">{{ detail.Q_answer | placeholder }}</span>
            </li>
        </ul>

        <h2>参考文献</h2>
        <ul class="introduction">
            <li>
                <span class="value">{{ detail.Source | placeholder }}</span>
            </li>
        </ul>
        <h2>来源书籍</h2>
        <ul class="introduction">
            <li>
                <span class="label"><i class="el-icon-star-on"></i> </span>
                <span class="value">{{ detail.B_ISBN }}:{{ detail.B_name | placeholder }}</span>
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
    </card>
</template>
<script>
import { _getDetail, _getRawDetail } from '@/services/api/consult';
export default {
    name: 'consultDetail',
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
                    if (this.$route.query.raw == '1') {
                        const { data } = await _getRawDetail({ id: this.$route.query.id });
                        data.drug = data.drug ? data.drug.split(',') : [];
                        this.detail = data;
                    } else {
                        const { data } = await _getDetail({ id: this.$route.query.id });
                        data.drug = data.drug ? data.drug.split(',') : [];

                        this.detail = data;
                    }
                    this.loading = false;
                } catch (error) {
                    this.loading = false;
                }
            }
        }
    }
};
</script>

<style lang="less" scoped>
.detail {
    overflow: scroll;
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
}
</style>
