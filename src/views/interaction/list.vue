<template>
    <card class="interaction">
        <!-- 搜索区域 -->
        <div class="search-container">
            <el-button @click="$router.push('/interaction/add')">新增</el-button>
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
                <el-table-column prop="id" label="作用ID" width="100"> </el-table-column>
                <el-table-column prop="name" label="药物名称" sortable="custom" width="150" show-overflow-tooltip> </el-table-column>
                <el-table-column prop="interaction" label="相互作用成分" width="150" show-overflow-tooltip> </el-table-column>
                <el-table-column prop="result" label="相互作用结果" show-overflow-tooltip> </el-table-column>

                <el-table-column prop="createTime" label="创建时间" sortable="custom" width="150"> </el-table-column>
                <el-table-column prop="creator" label="创建人" show-overflow-tooltip width="100"> </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" sortable="custom" width="150"> </el-table-column>
                <el-table-column prop="reviewer" label="审核人" show-overflow-tooltip width="100"> </el-table-column>

                <el-table-column label="操作" width="140" fixed="right">
                    <template slot-scope="{ row }">
                        <router-link :to="`/interaction/detail?id=${row.id}&raw=0`" target="_blank">
                            <el-button type="text" size="mini">预览</el-button></router-link
                        >
                        <router-link :to="`/interaction/update?id=${row.id}&raw=0`" target="_blank">
                            <el-button type="text" size="mini">修改</el-button></router-link
                        >
                        <el-button type="text" size="mini" @click="deleteRaw(row.id)">删除</el-button>
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
import { SELECT_TYPE } from '@/utils/constant/interaction';
import { _getList, _deleteOne } from '@/services/api/interaction';
export default {
    name: 'interactionList',
    data() {
        return {
            searchParams: {
                type: 'name',
                searchKey: '',
                orderType: '',
                order: 'asc',
                page: 1,
                size: 20
            },
            typeOptions: SELECT_TYPE,
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
        deleteRaw(id) {
            this.$confirm('确认删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    try {
                        const { code } = await _deleteOne({ id });
                        if (code == 1) {
                            this.$message.success('已删除');
                            this.getList();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
};
</script>

<style lang="less" scoped>
.interaction {
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
