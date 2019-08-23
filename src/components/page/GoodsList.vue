<template>
    <div class="goodslist">
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.goodname }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                            <span>{{ props.row.goodclass }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                            <span>{{ props.row.goodId }}</span>
                        </el-form-item>
                        <el-form-item label="店铺名称">
                            <span>{{ props.row.shopname }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ props.row.goodclass }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.descrption }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品 ID"
                    prop="goodId">
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    prop="goodname">
            </el-table-column>
            <el-table-column
                    label="状态"
                    prop="status">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page" style="margin:30px auto;">
            <el-pagination background layout="prev, pager, next" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20,50,100]" :page-size="pagesize" :total="totalCount" style="margin-top:30px;text-align:center;">
            </el-pagination>
        </div>
        <div class="dialog-bg" v-if="showDialog2">
        <div class="dialog-content">
            <div class="dialog-title">修改用户信息</div>
            <div class="dialog-form">
                <el-form>
                    <el-form-item class="el-flex">
                        <label class="el-form-item__label">店铺名称</label>
                        <el-input size="mini" v-model="selectTable.goodname"></el-input>
                    </el-form-item>
                    <el-form-item class="el-flex">
                        <label class="el-form-item__label">店铺简介</label>
                        <el-input type="textarea" :rows="4" size="mini" v-model="selectTable.descrption"></el-input>
                    </el-form-item>
                    <div class="dialog-btn">
                        <el-button type="primary" size="mini" @click="formSubmit">提交</el-button>
                    </div>
                </el-form>
            </div>

        </div>
    </div>

    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        data() {
            return {
                pagesize:10,
                currentPage:1,
                tableData: [],
                totalCount:0,
                dialogFormVisible:false,
                selectTable:{},
                showDialog2:false,
                index:0
            }
        },
        methods:{
            handleSizeChange(val){
                this.pagesize = val
                this.tableData = this.goodsList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                this.totalCount = this.goodsList.length
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.tableData = this.goodsList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                this.totalCount = this.goodsList.length
            },
            handleEdit(index,row){
                console.log(row)
                this.showDialog2 = true
                this.selectTable = row
                this.index = index
            },
            handleDel(index,row){
                let goodId = row.goodId
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    let goodNum = this.goodsList.splice(index,1)
                    this.tableData = this.goodsList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                    // console.log(this.shopList)
                    this.totalCount = this.goodsList.length
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            formSubmit(){
                this.goodsList[this.index].goodname = this.selectTable.goodname
                this.goodsList[this.index].descrption = this.selectTable.descrption
                this.showDialog2 = false
            }
        },
        mounted(){
            this.$store.dispatch('getGoods',()=>{
                this.$nextTick(()=>{
                    this.handleSizeChange(this.pagesize)
                    this.handleCurrentChange(this.currentPage)
                })
            })
        },
        computed:{
            ...mapState(['goodsList'])
        }
    }
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .dialog-bg{background:rgba(0,0,0,.5);position:fixed; left:0; top:0; width:100%;height:100vh;z-index:999 !important}
    .dialog-content{width:500px;height:300px;position:absolute;left:50%;top:50%;margin-left:-250px;margin-top:-150px;background:#fff;border-radius:10px;padding:20px;box-sizing:border-box;}
    .dialog-title{font-size:16px;font-weight:bold;text-align:center;margin-bottom:10px;color:#666;}
    .dialog-main{font-size:14px;color:#777;line-height:24px;}
    .dialog-btn{text-align:center;position:absolute;right:40px;bottom:30px;}
    .el-table{font-size:14px;}
    .el-form-item{margin-bottom:0 !important;}
    .el-form-item__label{line-height:30px;font-size:14px;}
    .el-form-item__content{line-height:30px !important;font-size:14px;}
</style>
