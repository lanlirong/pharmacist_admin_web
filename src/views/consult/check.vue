<template>
    <card class="consult">
        <!-- 搜索区域 -->
        <div class="search-container">
            <el-button @click="$router.push('/consult/add')">新增</el-button>
            <el-form :model="searchParams" :rules="rules" inline ref="searchForm" label-width="100px" class="demo-ruleForm">
                <el-form-item>
                    <el-select v-model="searchParams.type" placeholder="请选择">
                        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="searchKey">
                    <el-input v-model.trim="searchParams.searchKey" clearable></el-input>
                </el-form-item>
                <el-form-item label="审核状态:">
                    <el-select v-model="searchParams.status" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
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
                <el-table-column prop="id" label="问题ID" width="100"> </el-table-column>
                <el-table-column prop="Q_content" label="问题内容" sortable="custom" show-overflow-tooltip> </el-table-column>

                <el-table-column label="是否新数据" width="80">
                    <template slot-scope="{ row }">
                        <span v-if="row.isNew == 0" style="color: red;">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable="custom" width="150"> </el-table-column>
                <el-table-column prop="creator" label="创建人" show-overflow-tooltip width="100"> </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" sortable="custom" width="150"> </el-table-column>

                <el-table-column label="审核状态" width="120">
                    <template slot-scope="{ row }">
                        <el-tag v-if="row.status == 0" type="warning">未审核</el-tag>
                        <el-tag v-if="row.status == 1" type="success">审核通过</el-tag>
                        <el-tag v-if="row.status == 2" type="danger">审核未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="reviewer" label="审核人" show-overflow-tooltip width="100">
                    <template slot-scope="{ row }">
                        {{ row.reviewer | placeholder }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140" fixed="right">
                    <template slot-scope="{ row }">
                        <router-link :to="`/consult/check-detail?id=${row.id}`" target="_blank">
                            <el-button v-if="row.status == 0" type="text" size="mini">审核</el-button></router-link
                        >
                        <router-link :to="`/consult/detail?id=${row.id}&raw=1`" target="_blank">
                            <el-button type="text" size="mini">预览</el-button></router-link
                        >
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
import { SELECT_TYPE, STATUS } from '@/utils/constant/consult';
import { _getRawList } from '@/services/api/consult';
export default {
    name: 'consultList',
    data() {
        return {
            searchParams: {
                type: 'id',
                searchKey: '',
                orderType: '',
                order: 'asc',
                page: 1,
                size: 20,
                status: ''
            },
            typeOptions: SELECT_TYPE,
            statusOptions: STATUS,
            tableData: [],
            rules: {
                // searchKey: [{ required: true, message: '请输入查询值', trigger: 'blur' }]
            },
            currentPage: 1,
            total: 0,
            loading: false
        };
    },
    computed: {},
    created() {
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
                const { data } = await _getRawList({ ...this.searchParams });
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
.consult {
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
