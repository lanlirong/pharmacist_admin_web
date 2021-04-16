<template>
    <card class="drug" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文章标题：" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="文章简介：" prop="description">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 50 }" v-model="ruleForm.description"></el-input>
            </el-form-item>
        </el-form>
        <!-- 图片 -->
        <el-upload
            :with-credentials="true"
            :multiple="false"
            class="quill-upload"
            :action="serviceUrl"
            style="display: none;width:0"
            :show-file-list="false"
            :on-success="success"
            :before-upload="beforeAvatarUpload"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <quill-editor class="editor" ref="myTextEditor" v-model="ruleForm.content" :options="editorOption"></quill-editor>
        <div class="btns">
            <el-button>暂存</el-button>
            <el-button type="info">预览</el-button>
            <el-button :disabled="isSubmiting" @click="submitForm('ruleForm')" type="primary">确认</el-button>
        </div>
    </card>
</template>

<script>
import Axios from '@/services/http-interceptors';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';
import { _updateRaw, _getRawDetail, _getDetail } from '@/services/api/article';
export default {
    components: {
        quillEditor
    },
    data() {
        return {
            serviceUrl: Axios.defaults.baseURL + 'admin/article/uploadPicture',
            editorOption: {
                placeholder: '编辑文章内容',
                modules: {
                    toolbar: {
                        container: [
                            ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                            ['blockquote'], //引用，代码块
                            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
                            [{ list: 'ordered' }, { list: 'bullet' }], //列表
                            [{ script: 'sub' }, { script: 'super' }], // 上下标
                            [{ indent: '-1' }, { indent: '+1' }], // 缩进
                            [{ direction: 'rtl' }], // 文本方向
                            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
                            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
                            [{ font: [] }], //字体
                            [{ align: [] }], //对齐方式
                            ['clean'], //清除字体样式
                            ['image'] //上传图片、上传视频
                        ],
                        handlers: {
                            // 重写点击组件上的图片按钮要执行的代码
                            image: function(value) {
                                this.quillUpdateImg = true;
                                document.querySelector('.quill-upload .el-icon-upload').click();
                            }
                        }
                    }
                }
            },
            ruleForm: {
                title: '',
                content: '',
                description: '',
                imgUrls: []
            },
            rules: {
                title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
                description: [
                    { required: true, message: '请输入文章简介', trigger: 'blur' },
                    { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
                ]
            },
            loading: false,
            isSubmiting: false,
            quillUpdateImg: false
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
                    this.ruleForm = data;
                    this.ruleForm.imgUrls = [];
                } else {
                    const { data } = await _getDetail({ id: this.$route.query.id });
                    this.ruleForm = data;
                    this.ruleForm.imgUrls = [];
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
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
        success(res, file, fileList) {
            // res为图片服务器返回的数据
            // 获取富文本组件实例
            console.log(this.ruleForm, 'this.ruleForm.imgUrls');
            let quill = this.$refs.myTextEditor.quill;
            // 如果上传成功
            if (res.code == 1) {
                this.ruleForm.imgUrls.push(res.fileName);
                // 获取光标所在位置
                const pos = quill.selection.savedRange.index; //这个得注意下，网上很多都是不对的
                // 插入图片到光标位置
                quill.insertEmbed(pos, 'image', res.data);
                // 调整光标到最后
                quill.setSelection(length + 1);
            } else {
                this.$message.error('图片插入失败');
            }
            // loading动画消失
            this.quillUpdateImg = false;
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.updateRaw();
                } else {
                    return false;
                }
            });
        },
        async updateRaw() {
            this.isSubmiting = true;
            try {
                const { code, msg } = await _updateRaw(this.ruleForm);
                this.isSubmiting = false;
                if (code == 1) {
                    this.$message.success(msg);
                    this.$router.push('/article/my');
                }
            } catch (error) {
                this.isSubmiting = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.drug {
    display: flex;
    flex-direction: column;
    .editor {
        flex: 1;
        overflow: scroll;
    }
    .btns {
        border-top: @border;
        padding-top: 20px;
        text-align: right;
    }
}
</style>
