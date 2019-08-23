<template>
    <div class="shoplist">
        <div>
            <el-card shadow="hover" style="margin-bottom:20px;">
                <div slot="header" class="clearfix">
                    <span>商家列表</span>
                </div>
                <el-table :data="tableData" ref="multipleTable" height="330" border style="width: 100%;height:650px;font-size:14px !important;" >
                    <el-table-column prop="shopId" label="店铺ID" width="100" align="center"></el-table-column>
                    <el-table-column prop="shopname" label="店铺名称" width="160" align="center"></el-table-column>
                    <el-table-column prop="shopcode" label="店铺账号" width="100" align="center"></el-table-column>
                    <el-table-column prop="shopclass" label="店铺类别" width="100" align="center"></el-table-column>
                    <el-table-column prop="shoplevel" label="所属等级"  width="120"align="center"></el-table-column>
                    <el-table-column prop="address" label="商家地址" width="150" align="center"></el-table-column>
                    <el-table-column prop="date" label="进驻时间" width="180" align="center"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="changeNav">添加食品</el-button>
                            <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" @size-change="handleSizeChange"
                               @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20,50,100]" :page-size="pagesize" :total="totalCount" style="margin-top:30px;text-align:center;">
                </el-pagination>
            </el-card>
            <div class="dialog-bg" v-if="dialogShow">
                <div class="dialog-content">
                    <div class="dialog-title">{{shopname}}</div>
                    <div class="dialog-main">{{shopcontent}}</div>
                    <div class="dialog-btn">
                        <el-button type="primary" size="mini" @click="toggleHide">关闭</el-button>
                    </div>
                </div>
            </div>
            <div class="dialog-bg" v-if="dialogShow2">
                <div class="dialog-content">
                    <div class="dialog-title">修改用户信息</div>
                    <div class="dialog-form">
                        <el-form>
                            <el-form-item class="el-flex">
                                <label class="el-form-item__label">店铺名称</label>
                                <el-input size="mini" v-model="shopname"></el-input>
                            </el-form-item>
                            <el-form-item class="el-flex">
                                <label class="el-form-item__label">店铺简介</label>
                                <el-input type="textarea" :rows="6" size="mini" v-model="shopcontent"></el-input>
                            </el-form-item>
                            <div class="dialog-btn">
                                <el-button type="primary" size="mini" @click="formSubmit">提交</el-button>
                            </div>
                        </el-form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        data(){
            return {
                pagesize:10,
                currentPage:1,
                tableData:[],
                totalCount:0,
                dialogShow:false,
                dialogShow2:false,
                shopcontent:'',
                shopname:'',
                index:0
            }
        },
        methods:{
            handleSizeChange(val) {
                this.pagesize = val
                this.tableData = this.shopList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                this.totalCount = this.shopList.length
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.tableData = this.shopList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                this.totalCount = this.shopList.length
            },
            handleShow(index,row){
                this.shopcontent = row.shopcontent
                this.shopname = row.shopname
                this.dialogShow = true
            },
            handleEdit(index,row){
                this.shopname = row.shopname
                this.shopcontent = row.shopcontent
                this.index = index
                this.dialogShow2 = true
            },
            handleDel(index,row){
                let shopId = row.shopId
                this.$confirm('此操作将永久删除该商户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    let shopNum = this.shopList.splice(index,1)
                    this.tableData = this.shopList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                    // console.log(this.shopList)
                    this.totalCount = this.shopList.length
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            toggleHide(){
                this.dialogShow = false
            },
            formSubmit(){
                this.shopList[this.index].shopname = this.shopname
                this.shopList[this.index].shopcontent = this.shopcontent
                this.dialogShow2 = false
            },
            changeNav(){
                console.log(this.$router.replace('/addgoods'))
            }
        },
        mounted(){
            this.$store.dispatch('getShop',()=>{
                this.$nextTick(()=>{
                    this.handleSizeChange(this.pagesize)
                    this.handleCurrentChange(this.currentPage)
                })
            })
        },
        computed:{
            ...mapState(['shopList'])
        }
    }
</script>

<style>
.dialog-bg{background:rgba(0,0,0,.5);position:fixed; left:0; top:0; width:100%;height:100vh;z-index:999 !important}
    .dialog-content{width:500px;height:300px;position:absolute;left:50%;top:50%;margin-left:-250px;margin-top:-150px;background:#fff;border-radius:10px;padding:20px;box-sizing:border-box;}
    .dialog-title{font-size:16px;font-weight:bold;text-align:center;margin-bottom:15px;color:#666;}
    .dialog-main{font-size:14px;color:#777;line-height:24px;}
    .dialog-btn{text-align:center;position:absolute;right:40px;bottom:30px;}
    .el-table{height:600px !important;}
    .el-flex .el-form-item__content{display:flex;}
    .el-flex .el-form-item__label{font-size:14px !important;width:70px;}
    .shoplist .el-table td, .shoplist .el-table th{padding:11px 0;}
</style>
