<template>
    <card class="drug">
        <!-- 搜索区域 -->
        <div class="search-container">
            <el-button @click="$router.push('/drug/add')">新增</el-button>
            <el-form :model="searchParams" :rules="rules" inline ref="searchForm" label-width="100px" class="demo-ruleForm">
                <el-form-item>
                    <el-select v-model="searchParams.type" placeholder="请选择">
                        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="searchKey">
                    <el-input v-model.trim="searchParams.searchKey" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('searchForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 搜索区域 -->
        <div class="table-container">
            <el-table
                height="100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :data="tableData"
                style="width: 100%"
                @sort-change="sortChange"
            >
                <el-table-column prop="id" label="药品ID" width="80"> </el-table-column>
                <el-table-column prop="drug_name" label="药品名称" width="100" sortable="custom" show-overflow-tooltip> </el-table-column>
                <el-table-column prop="bar_code" label="药品条码" width="130"> </el-table-column>
                <el-table-column prop="drug_brand" label="商品名" show-overflow-tooltip width="100">
                    <template slot-scope="{ row }">{{ row.drug_brand | placeholder }}</template>
                </el-table-column>
                <el-table-column prop="approval_number" label="批准文号" width="140"> </el-table-column>
                <el-table-column label="性质分类" width="100">
                    <template slot-scope="{ row }">
                        <el-tag :type="nature_tag_color(row.nature_class)">{{ row.nature_class }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" sortable="custom" width="150"> </el-table-column>
                <el-table-column prop="operator" label="更新人" show-overflow-tooltip width="100"> </el-table-column>
                <el-table-column prop="indication" label="适应症" show-overflow-tooltip width="250">
                    <template slot-scope="{ row }">{{ row.indication | placeholder }}</template>
                </el-table-column>
                <el-table-column prop="constituents" label="主要成分" show-overflow-tooltip width="250">
                    <template slot-scope="{ row }">{{ row.constituents | placeholder }}</template>
                </el-table-column>

                <el-table-column label="操作" width="140" fixed="right">
                    <template slot-scope="{ row }">
                        <router-link :to="`/drug/detail?id=${row.id}`" target="_blank">
                            <el-button type="text" size="mini">查看</el-button></router-link
                        >
                        <router-link :to="`/drug/update?id=${row.id}`" target="_blank">
                            <el-button type="text" size="mini">修改</el-button></router-link
                        >
                        <el-button type="text" size="mini" @click="deleteDrug">删除</el-button>
                    </template>
                </el-table-column>
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
import { SELECT_TYPE, DRUG_NATURE_CLASS } from '@/utils/constant/drug';
import { _getList } from '@/services/api/drug';
export default {
    name: 'drugList',
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
            total: 0,
            loading: false
        };
    },
    computed: {
        nature_tag_color() {
            return function(params) {
                let color = '';
                DRUG_NATURE_CLASS.filter(item => {
                    if (item.value === params) {
                        color = item.color;
                    }
                });
                return color;
            };
        }
    },
    created() {},
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
        },
        deleteDrug() {}
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
        .el-table {
            a {
                padding-right: 10px;
            }
        }
    }
    .el-pagination {
        height: 28px;
        padding-top: 20px;
        text-align: right;
        border-top: @border;
    }
}
</style>
