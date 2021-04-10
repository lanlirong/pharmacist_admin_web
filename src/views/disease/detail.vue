<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <h2>基本信息</h2>
        <div class="basic-container">
            <ul>
                <li>
                    <span class="label">疾病ID:</span>
                    <span class="value">{{ detail.id | placeholder }}</span>
                </li>
                <li>
                    <span class="label">疾病名称:</span> <span class="value">{{ detail.name | placeholder }}</span>
                </li>
                <li>
                    <span class="label">发病人群:</span>
                    <span class="value">{{ detail.crowd | placeholder }}</span>
                </li>
                <li>
                    <span class="label">传染性:</span> <span class="value">{{ detail.contagion | placeholder }}</span>
                </li>
                <li>
                    <span class="label">并发症:</span>
                    <span class="value">{{ detail.complication | placeholder }}</span>
                </li>
                <li>
                    <span class="label">治疗方式:</span> <span class="value">{{ detail.treatWay | placeholder }}</span>
                </li>
                <li>
                    <span class="label">治疗周期:</span>
                    <span class="value">{{ detail.cycle | placeholder }}</span>
                </li>
                <li>
                    <span class="label">治愈率:</span>
                    <span class="value">{{ detail.rate | placeholder }}</span>
                </li>
            </ul>
        </div>
        <h2>常用药物</h2>
        <div class="main-disease">
            <el-link v-for="(item, index) in detail.drug" :key="index" type="primary">{{ item }}</el-link>
        </div>
        <h2>疾病简介</h2>
        <ul class="introduction">
            <li>
                <!-- <span class="label">疾病简介:</span> -->
                <span class="value">{{ detail.introduction | placeholder }}</span>
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
import { _getDetail, _getRawDetail } from '@/services/api/disease';
export default {
    name: 'diseaseDetail',
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
    .introduction {
    }

    .systerm-info {
        li {
            width: 33%;
        }
    }
}
</style>
