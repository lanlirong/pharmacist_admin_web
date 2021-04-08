<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <h2>基本信息</h2>
        <div class="basic-container">
            <ul>
                <li>
                    <span class="label">药品ID:</span>
                    <span class="value">{{ detail.id | placeholder }}</span>
                </li>
                <li>
                    <span class="label">药品名称:</span> <span class="value">{{ detail.drug_name | placeholder }}</span>
                </li>
                <li>
                    <span class="label">商品条码:</span>
                    <span class="value">{{ detail.bar_code | placeholder }}</span>
                </li>
                <li>
                    <span class="label">商品名:</span> <span class="value">{{ detail.drug_brand | placeholder }}</span>
                </li>
                <li>
                    <span class="label">批准文号:</span>
                    <span class="value">{{ detail.approval_number | placeholder }}</span>
                </li>
                <li>
                    <span class="label">性质分类:</span> <span class="value">{{ detail.nature_class | placeholder }}</span>
                </li>
                <li>
                    <span class="label">拼音简码:</span>
                    <span class="value">{{ detail.simple_code | placeholder }}</span>
                </li>
                <li>
                    <span class="label">本位码:</span>
                    <span class="value">{{ detail.bit_code | placeholder }}</span>
                </li>

                <li>
                    <span class="label">规格:</span> <span class="value">{{ detail.specifications | placeholder }}</span>
                </li>
                <li>
                    <span class="label">剂型:</span> <span class="value">{{ detail.dosage_form | placeholder }}</span>
                </li>
                <li>
                    <span class="label">包装单位:</span> <span class="value">{{ detail.packing_unit | placeholder }}</span>
                </li>
                <li>
                    <span class="label">是否处方药:</span>
                    <span class="value"
                        ><el-tag :type="drugTypeColors[detail.drug_type]">{{ drugTypes[detail.drug_type] | placeholder }}</el-tag></span
                    >
                </li>
                <li>
                    <span class="label">用途分类:</span> <span class="value">{{ detail.use_class | placeholder }}</span>
                </li>
            </ul>
            <div class="picture">
                <img :src="detail.picture" alt="" :onerror="defaultImg" />
            </div>
        </div>
        <h2>主治疾病</h2>
        <div class="main-disease">
            <el-link v-for="(item, index) in detail.mainDiseases" :key="index" type="primary">{{ item }}</el-link>
        </div>

        <h2>治疗信息</h2>
        <ul class="treat-info">
            <li>
                <span class="label">主要成分:</span>
                <span class="value">{{ detail.constituents | placeholder }}</span>
            </li>
            <li>
                <span class="label">性状:</span>
                <span class="value">{{ detail.property | placeholder }}</span>
            </li>
            <li>
                <span class="label">适应症:</span>
                <span class="value">{{ detail.indication | placeholder }}</span>
            </li>
            <li>
                <span class="label">主要成分:</span>
                <span class="value">{{ detail.constituents | placeholder }}</span>
            </li>
            <li>
                <span class="label">用法用量:</span>
                <span class="value">{{ detail.dosage | placeholder }}</span>
            </li>
            <li>
                <span class="label">不良反应:</span>
                <span class="value">{{ detail.adverse_reactions | placeholder }}</span>
            </li>
            <li>
                <span class="label">禁忌:</span>
                <span class="value">{{ detail.contraindication | placeholder }}</span>
            </li>
            <li>
                <span class="label">注意事项:</span>
                <span class="value">{{ detail.attentions | placeholder }}</span>
            </li>
            <li>
                <span class="label">药物相互作用:</span>
                <span class="value">{{ detail.interreaction | placeholder }}</span>
            </li>
            <li>
                <span class="label">贮藏:</span>
                <span class="value">{{ detail.depot | placeholder }}</span>
            </li>
        </ul>
        <h2>生产信息</h2>
        <ul class="manufacturer-info">
            <li>
                <span class="label">生产厂家:</span>
                <span class="value">{{ detail.manufacturer | placeholder }}</span>
            </li>
            <li>
                <span class="label">生产厂地:</span>
                <span class="value">{{ detail.address | placeholder }}</span>
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
            <li>
                <span class="label">最近更新人:</span>
                <span class="value">{{ detail.operator | placeholder }}</span>
            </li>
        </ul>
    </card>
</template>
<script>
import { _getDetail, _getRawDetail } from '@/services/api/drug';
export default {
    name: 'drugDetail',
    data() {
        return {
            detail: {},
            loading: false,
            drugTypes: ['非处方药', '处方药'],
            drugTypeColors: ['success', 'danger'],
            defaultImg: 'this.src="' + require('@/assets/img/default.png') + '"'
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
}
</style>
