<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <h2>基本信息</h2>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
            <div class="basic-container">
                <ul>
                    <li>
                        <el-form-item label="问题内容" prop="Q_content">
                            <el-input v-model="formData.Q_content"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="问题类型">
                            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 50 }" v-model="formData.K_type"></el-input>
                        </el-form-item>
                    </li>
                </ul>
            </div>
            <h2>知识链接</h2>
            <div class="basic-container">
                <ul>
                    <li>
                        <el-form-item label="知识链接">
                            <el-input v-model="formData.K_link" type="textarea" :autosize="{ minRows: 3, maxRows: 50 }"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="问题回答">
                            <el-input v-model="formData.Q_answer" type="textarea" :autosize="{ minRows: 3, maxRows: 50 }"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="参考文献">
                            <el-input v-model="formData.Source" type="textarea" :autosize="{ minRows: 3, maxRows: 50 }"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="来源书籍">
                            <el-input v-model="formData.B_name" type="textarea" :autosize="{ minRows: 3, maxRows: 50 }"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="书籍ISBN">
                            <el-input v-model="formData.B_ISBN"></el-input>
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
import { _addRaw } from '@/services/api/consult';
export default {
    name: 'consultAdd',
    data() {
        return {
            formData: {
                Q_content: 'test',
                K_type: '',
                K_link: '',
                Q_answer: 'test',
                Source: '',
                B_ISBN: '',
                reference1: '',
                reference2: '',
                reference3: '',
                reference4: '',
                reference5: ''
            },
            loading: false,
            rules: {
                Q_content: [
                    { required: true, message: '请输入问题', trigger: 'blur' },
                    { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                ],
                Q_answer: [
                    { required: true, message: '请输入问题答案', trigger: 'blur' },
                    { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {},
    methods: {
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
                const { code, msg } = await _addRaw({ ...this.formData });
                if (code == 1) {
                    this.$notify({
                        title: '成功',
                        message: msg + '，请等待审核通过',
                        type: 'success'
                    });
                    this.$router.push('/consult/my');
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
