<template>
    <div class="orderlist">
        <el-card shadow="hover" style="margin-bottom:20px;">
            <div slot="header" class="clearfix">
                <span>订单列表</span>
            </div>
            <el-table :data="tableData" ref="multipleTable" height="330" border style="width: 100%;height:650px;font-size:14px !important;" >
                <el-table-column prop="orderId" label="订单号" width="180" align="center"></el-table-column>
                <el-table-column prop="name" label="收货人" width="100" align="center"></el-table-column>
                <el-table-column prop="money" label="金额" width="100" align="center"></el-table-column>
                <el-table-column prop="address" label="收货地址" width="300" align="center"></el-table-column>
                <el-table-column prop="status" label="订单状态" width="80" align="center"></el-table-column>
                <el-table-column prop="date" label="发货时间" align="center"></el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20,50,100]" :page-size="pagesize" :total="orderList.length" style="margin-top:30px;text-align:center;">
            </el-pagination>
        </el-card>
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
                totalCount:0
            }
        },
        methods:{
            handleSizeChange(val) {
                this.pagesize = val
                this.tableData = this.orderList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                this.totalCount = this.orderList.length
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.tableData = this.orderList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                this.totalCount = this.orderList.length
            }
        },
        mounted(){
            this.$store.dispatch('getOrder',()=>{
                this.$nextTick(()=>{
                    this.handleSizeChange(this.pagesize)
                    this.handleCurrentChange(this.currentPage)
                })
            })
        },
        computed:{
            ...mapState(['orderList'])
        }
    }
</script>

<style>
    .orderlist .el-table td, .orderlist .el-table th{
        padding:15px 0;
    }
    .orderlist .el-table{height:550px !important;}
</style>
