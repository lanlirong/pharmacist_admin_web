<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <h2>基本信息</h2>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
            <div class="title">
                <el-form-item label="药品名称" prop="name">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="相互作用成分" prop="interaction">
                    <el-input v-model="formData.interaction"></el-input>
                </el-form-item>
            </div>
            <div class="basic-container">
                <ul>
                    <li>
                        <el-form-item label="作用结果" prop="result">
                            <el-input v-model="formData.result"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="临床建议">
                            <el-input v-model="formData.suggest"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="临床证据">
                            <el-input v-model="formData.evidence"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="证据级别">
                            <el-input v-model="formData.level"></el-input>
                        </el-form-item>
                    </li>
                </ul>
            </div>
            <h2>参考文献</h2>
            <div class="basic-container">
                <ul>
                    <li>
                        <el-form-item label="参考文献1">
                            <el-input v-model="formData.reference1" type="textarea"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="参考文献2">
                            <el-input v-model="formData.reference2" type="textarea"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="参考文献3">
                            <el-input v-model="formData.reference3" type="textarea"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="参考文献4">
                            <el-input v-model="formData.reference4" type="textarea"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="参考文献5">
                            <el-input v-model="formData.reference5" type="textarea"></el-input>
                        </el-form-item>
                    </li>
                </ul>
            </div>

            <el-form-item>
                <div class="button-container">
                    <el-button>放弃提交</el-button>
                    <el-button>暂存</el-button>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </div>
            </el-form-item>
        </el-form>
    </card>
</template>
<script>
import { _updateRaw, _getRawDetail, _getDetail } from '@/services/api/interaction';
export default {
    name: 'interactionAdd',
    data() {
        return {
            formData: {
                name: '',
                interaction: '',
                result: '',
                suggest: '',
                evidence: '',
                level: '',
                reference1: '',
                reference2: '',
                reference3: '',
                reference4: '',
                reference5: ''
            },
            loading: false,
            rules: {
                name: [
                    { required: true, message: '请输入药物名称', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                interaction: [
                    { required: true, message: '请输入相互作用成分', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                result: [
                    { required: true, message: '请输入相互作用结果', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {
        this.getDetail();
    },
    methods: {
        async getDetail() {
            this.loading = true;
            try {
                if (this.$route.query.raw == 1) {
                    const { data } = await _getRawDetail({ id: this.$route.query.id });
                    this.formData = data;
                } else {
                    const { data } = await _getDetail({ id: this.$route.query.id });
                    this.formData = data;
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    this.submitData();
                } else {
                    return false;
                }
            });
        },
        // 保存文字数据
        async submitData() {
            try {
                const { code, msg } = await _updateRaw({ ...this.formData });
                if (code == 1) {
                    this.$notify({
                        title: '成功',
                        message: msg + '，请等待审核通过',
                        type: 'success'
                    });
                    this.$router.push('/interaction/my');
                }
            } catch (error) {
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
        display: flex;
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
        }
        .el-select {
            width: 100%;
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
            width: 100%;
            max-width: 1000px;
            line-height: 24px;
            margin-bottom: 10px;
        }
    }
    .button-container {
        float: right;
    }
}
</style>
