<template>
    <card class="drug">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文章标题：" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
        </el-form>
        <quill-editor class="editor" ref="myTextEditor" v-model="ruleForm.content" :options="editorOption"></quill-editor>
        <div class="btns">
            <el-button>暂存</el-button>
            <el-button type="info">预览</el-button>
            <el-button @click="submitForm('ruleForm')" type="primary">确认</el-button>
        </div>
    </card>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';
import { _addRaw } from '@/services/api/article';
export default {
    components: {
        quillEditor
    },
    data() {
        return {
            // content: a,
            editorOption: {
                placeholder: '编辑文章内容',
                modules: {
                    toolbar: [
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
                    ]
                }
            },
            ruleForm: {
                title: 'test',
                content: ''
            },
            rules: {
                title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }]
            },
            isSubmiting: false
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.addRaw();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async addRaw() {
            this.isSubmiting = true;
            try {
                const { code, msg } = await _addRaw(this.ruleForm);
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
    // height: 100%;
    display: flex;
    flex-direction: column;
    .editor {
        flex: 1;
        // height: 100%;
        overflow: scroll;
    }
    .btns {
        // position: fixed;
        // bottom: 0;
        // width: 100%;
        // background-color: #fff;
        // padding: 20px 0;
        border-top: @border;
        // margin-top: 20px;
        // height: 28px;
        padding-top: 20px;
        text-align: right;
    }
}
</style>
