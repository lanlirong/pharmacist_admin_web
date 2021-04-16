<template>
    <card class="detail" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <h2>基本信息</h2>
        <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
            <div class="basic-container">
                <ul>
                    <li>
                        <el-form-item label="药品名称" prop="drug_name">
                            <el-input v-model="formData.drug_name"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="商品条码" prop="bar_code">
                            <el-input v-model="formData.bar_code" maxlength="13" show-word-limit></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="商品名">
                            <el-input v-model="formData.drug_brand"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="批准文号">
                            <el-input v-model="formData.approval_number"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="性质分类" prop="nature_class">
                            <el-select v-model="formData.nature_class" placeholder="请下拉选择">
                                <el-option
                                    v-for="(item, index) in natureOptions"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="拼音简码">
                            <el-input v-model="formData.simple_code"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="本位码">
                            <el-input v-model="formData.bit_code"></el-input>
                        </el-form-item>
                    </li>

                    <li>
                        <el-form-item label="规格" prop="specifications">
                            <el-input v-model="formData.specifications"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="剂型" prop="dosage_form">
                            <el-input v-model="formData.dosage_form"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="包装单位">
                            <el-input v-model="formData.packing_unit"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="用途分类">
                            <el-input v-model="formData.use_class"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="是否处方药" prop="drug_type">
                            <el-radio-group v-model="formData.drug_type">
                                <el-radio :label="0">{{ drugTypes[0] }}</el-radio>
                                <el-radio :label="1">{{ drugTypes[1] }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </li>
                </ul>
                <div class="picture">
                    <el-upload
                        class="avatar-uploader"
                        ref="upload"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-change="handleChange"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="false"
                        with-credentials
                    >
                        <img v-if="formData.picture" :src="formData.picture" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <h2>主治疾病</h2>
            <div class="main-disease">
                <el-form-item label="主治疾病">
                    <el-input
                        v-model.trim="mainDisease"
                        placeholder="按回车键(enter)添加"
                        @keyup.enter.native="addDisease"
                        clearable
                    ></el-input>
                    <div v-if="mainDiseases.length > 0">
                        <span class="add-text"> 已添加：</span
                        ><el-tag type="success" closable v-for="(item, index) in mainDiseases" :key="index" @close="removeDisease(item)">{{
                            item
                        }}</el-tag>
                    </div>
                </el-form-item>
            </div>

            <h2>治疗信息</h2>
            <ul class="treat-info">
                <li>
                    <el-form-item label="主要成分">
                        <el-input
                            type="textarea"
                            v-model="formData.constituents"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="性状">
                        <el-input
                            type="textarea"
                            v-model="formData.property"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="适应症">
                        <el-input
                            type="textarea"
                            v-model="formData.indication"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="主要成分">
                        <el-input
                            type="textarea"
                            v-model="formData.constituents"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="用法用量">
                        <el-input
                            type="textarea"
                            v-model="formData.dosage"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="不良反应">
                        <el-input
                            type="textarea"
                            v-model="formData.adverse_reactions"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="禁忌">
                        <el-input
                            type="textarea"
                            v-model="formData.contraindication"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="注意事项">
                        <el-input
                            type="textarea"
                            v-model="formData.attentions"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="药物相互作用">
                        <el-input
                            type="textarea"
                            v-model="formData.interreaction"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="贮藏">
                        <el-input
                            type="textarea"
                            v-model="formData.depot"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
            </ul>
            <h2>生产信息</h2>
            <ul class="manufacturer-info">
                <li>
                    <el-form-item label="生产厂家" prop="manufacturer">
                        <el-input
                            type="textarea"
                            v-model="formData.manufacturer"
                            maxlength="200"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item label="生产厂地">
                        <el-input
                            type="textarea"
                            v-model="formData.address"
                            maxlength="200"
                            show-word-limit
                            :autosize="{ minRows: 3, maxRows: 50 }"
                        ></el-input>
                    </el-form-item>
                </li>
            </ul>
            <el-form-item>
                <div class="button-container">
                    <el-button>放弃提交</el-button>
                    <!-- <el-button>暂存</el-button> -->
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </div>
            </el-form-item>
        </el-form>
    </card>
</template>
<script>
import Axios from '@/services/http-interceptors';

import { _addRawDrug, _getDetail, _getRawDetail } from '@/services/api/drug';
import { DRUG_NATURE_CLASS } from '@/utils/constant/drug';
export default {
    name: 'drugUpdate',
    data() {
        return {
            uploadUrl: Axios.defaults.baseURL + 'admin/drug/uploadDrugPicture',
            formData: {
                drug_name: 'test',
                bar_code: '1234567890123',
                nature_class: '西药',
                specifications: '10g/盒',
                dosage_form: '胶囊',
                drug_type: 0,
                mainDiseases: [],
                manufacturer: 'xxx',
                picture: ''
            },
            mainDisease: '',
            mainDiseases: [],
            loading: false,
            drugTypes: ['非处方药', '处方药'],
            drugTypeColors: ['success', 'danger'],
            defaultImg: 'this.src="' + require('@/assets/img/default.png') + '"',
            natureOptions: DRUG_NATURE_CLASS,
            rules: {
                drug_name: [
                    { required: true, message: '请输入药品名称', trigger: 'blur' },
                    { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
                ],
                bar_code: [
                    { required: true, message: '请输入商品条码', trigger: 'blur' },
                    { min: 13, max: 13, message: '长度为13 个字符', trigger: 'blur' }
                ],
                nature_class: [{ required: true, message: '请选择性质分类', trigger: 'blur' }],
                specifications: [
                    { required: true, message: '请输入规格', trigger: 'blur' },
                    { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
                ],
                dosage_form: [
                    { required: true, message: '请输入剂型', trigger: 'blur' },
                    { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
                ],
                drug_type: [{ required: true, message: '请选择是否处方药', trigger: 'blur' }],
                manufacturer: [
                    { required: true, message: '请输入生产厂家', trigger: 'blur' },
                    { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                ]
            },
            pictureChange: false
        };
    },
    mounted() {
        this.getDetail();
    },
    methods: {
        async handleChange(file) {
            console.log(file);
            this.pictureChange = true;
            this.formData.picture = URL.createObjectURL(file.raw);
            if (file.status == 'success' && file.response.data) {
                this.$message.success('图片上传成功');
                this.submitData();
            } else if (file.status == 'success' && !file.response.data) {
                this.$message.error('图片上传失败');
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt10M = file.size / 1024 / 1024 < 10;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
            }
            if (!isLt10M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isJPG && isLt10M;
        },
        addDisease() {
            if (this.mainDisease !== '') {
                this.mainDiseases.push(this.mainDisease);
                this.mainDisease = '';
            }
        },
        removeDisease(tag) {
            this.mainDiseases.splice(this.mainDiseases.indexOf(tag), 1);
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    this.formData.mainDiseases = this.mainDiseases;
                    this.$refs.upload.submit();
                    // 没有上传图片时 直接提交文字数据
                    if (this.formData.picture == '' || !this.pictureChange) {
                        this.submitData();
                    }
                } else {
                    this.$message.error('提交失败');
                    return false;
                }
            });
        },
        // 保存文字数据
        async submitData() {
            try {
                const { code, msg } = await _addRawDrug({ ...this.formData, pictureChange: this.pictureChange });
                if (code == 1) {
                    // this.$message.success(msg + '，请等待审核通过');
                    this.$notify({
                        title: '成功',
                        message: msg + '，请等待审核通过',
                        type: 'success'
                    });
                    this.$router.push('/drug/my');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getDetail() {
            if (this.$route.query.id) {
                this.loading = true;
                try {
                    if (this.$route.query.raw == '1') {
                        const { data } = await _getRawDetail({ id: this.$route.query.id });
                        this.formData = data;
                        this.mainDiseases = data.mainDiseases;
                    } else {
                        const { data } = await _getDetail({ id: this.$route.query.id });
                        this.formData = data;
                        this.mainDiseases = data.mainDiseases;
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
            // line-height: 35px;
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
        .picture {
            width: 200px;
            // border: @border;
            .el-upload--text {
                width: 200px;
            }
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409eff;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }
    }
    .main-disease {
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
