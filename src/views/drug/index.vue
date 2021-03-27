<template>
    <card class="drug">
        <!-- 搜索区域 -->
        <div class="search-container">
            <el-form :model="searchParams" :rules="rules" inline ref="searchForm" label-width="100px" class="demo-ruleForm">
                <el-form-item>
                    <el-select v-model="searchParams.type" placeholder="请选择">
                        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="searchKey">
                    <el-input v-model="searchParams.searchKey"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('searchForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 搜索区域 -->
        <div class="table-container">
            <el-table height="100%" v-loading="loading" :data="tableData" style="width: 100%" @sort-change="sortChange">
                <el-table-column prop="id" label="药品ID" width="80"> </el-table-column>
                <el-table-column prop="drug_name" label="药品名称" width="100" sortable="custom" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="bar_code" label="药品条码" sortable="custom"> </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination
            @current-change="getList"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="total, prev, pager, next"
            :total="total"
        >
        </el-pagination>
    </card>
</template>

<script>
import { SELECT_TYPE } from '@/utils/constant/drug';
import { _getList } from '@/services/api/drug';
export default {
    data() {
        return {
            searchParams: {
                type: 'drug_name',
                searchKey: '三七',
                orderType: '',
                order: 'asc',
                page: 1,
                size: 20
            },
            typeOptions: SELECT_TYPE,
            tableData: [],
            rules: {
                searchKey: [{ required: true, message: '请输入查询值', trigger: 'blur' }]
            },
            currentPage: 1,
            total: 100,
            loading: false
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.getList();
                } else {
                    return false;
                }
            });
        },
        async getList(page = 1) {
            this.searchParams.page = page;
            this.searchParams.size = 20;
            this.loading = true;
            try {
                const { data } = await _getList({ ...this.searchParams });
                this.tableData = data.data;
                this.total = data.total;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        sortChange(val) {
            this.searchParams.orderType = val.prop;
            this.searchParams.order = val.order === 'ascending' ? 'asc' : 'desc';
            this.getList();
        }
    }
};
</script>

<style lang="less" scoped>
.drug {
    height: 100%;
    display: flex;
    flex-direction: column;
    .search-container {
        height: 50px;
        .el-form {
            float: right;
        }
    }
    .table-container {
        flex: 1;
    }
    .el-pagination {
        height: 28px;
        padding-top: 20px;
        text-align: right;
        border-top: @border;
    }
}
</style>
