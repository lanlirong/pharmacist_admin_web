<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <h2>基本信息</h2>
        <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
            <div class="basic-container">
                <ul>
                    <li>
                        <el-form-item label="疾病名称" prop="name">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="发病人群" prop="crowd">
                            <el-input v-model="formData.crowd"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="传染性" prop="contagion">
                            <el-input v-model="formData.contagion"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="并发症">
                            <el-input v-model="formData.complication"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="治疗方式">
                            <el-input v-model="formData.treatWay"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="治疗周期">
                            <el-input v-model="formData.cycle"></el-input>
                        </el-form-item>
                    </li>

                    <li>
                        <el-form-item label="治愈率">
                            <el-input v-model="formData.rate"></el-input>
                        </el-form-item>
                    </li>
                </ul>
            </div>
            <h2>常用药物</h2>
            <div class="main-drug">
                <el-form-item label="常用药物">
                    <el-input v-model.trim="mainDrug" placeholder="按回车键(enter)添加" @keyup.enter.native="addDrug" clearable></el-input>
                    <div v-if="mainDrugs.length > 0">
                        <span class="add-text"> 已添加：</span
                        ><el-tag type="success" closable v-for="(item, index) in mainDrugs" :key="index" @close="removeDrug(item)">{{
                            item
                        }}</el-tag>
                    </div>
                </el-form-item>
            </div>

            <h2>治疗信息</h2>
            <ul class="treat-info">
                <li>
                    <el-form-item label="疾病简介" prop="introduction">
                        <el-input
                            type="textarea"
                            v-model="formData.introduction"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
            </ul>
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
import { _addRaw } from '@/services/api/disease';
export default {
    name: 'diseaseAdd',
    data() {
        return {
            formData: {
                name: 'testDisease',
                crowd: '儿童',
                contagion: '无传染性',
                complication: '',
                treatWay: '药物治疗',
                cycle: '一个月',
                rate: '90%',
                introduction: 'hahhahahha'
            },
            mainDrug: '',
            mainDrugs: [],
            loading: false,
            rules: {
                name: [
                    { required: true, message: '请输入疾病名称', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                crowd: [
                    { required: true, message: '请输入发病人群', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                contagion: [
                    { required: true, message: '请输入传染性', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                introduction: [
                    { required: true, message: '请输入疾病简介', trigger: 'blur' },
                    { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {},
    methods: {
        addDrug() {
            if (this.mainDrug !== '') {
                this.mainDrugs.push(this.mainDrug);
                this.mainDrug = '';
            }
        },
        removeDrug(tag) {
            this.mainDrugs.splice(this.mainDrugs.indexOf(tag), 1);
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    this.formData.mainDrug = this.mainDrugs.join(',');
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
                    // this.$message.success(msg + '，请等待审核通过');
                    this.$notify({
                        title: '成功',
                        message: msg + '，请等待审核通过',
                        type: 'success'
                    });
                    this.$router.push('/disease/my');
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
                width: 33%;
            }
        }
    }
    .main-drug {
        min-height: 70px;
        margin-bottom: 20px;
        .el-input {
            width: 30%;
            max-width: 500px;
        }
        .el-tag {
            margin-right: 10px;
        }
        .add-text {
            color: #606266;
            font-size: 12px;
        }
    }
    .treat-info,
    .manufacturer-info {
        li {
            width: 50%;
            line-height: 24px;
            margin-bottom: 10px;
        }
    }
    .button-container {
        float: right;
    }
}
</style>
