<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10" @change="selectChange">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" style="font-size:14px;" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="date" label="日期" sortable width="150" align="center">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="120" align="center">
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20,50,100]" :page-size="pagesize" :total="totalCount" style="margin-top:30px;text-align:center;">
            </el-pagination>
        </div>
        <div class="dialog-bg" v-if="dialogShow2">
            <div class="dialog-content">
                <div class="dialog-title">修改用户信息</div>
                <div class="dialog-form">
                    <el-form>
                        <el-form-item class="el-flex" style="margin:0;">
                            <label class="el-form-item__label">姓名</label>
                            <el-input size="mini" v-model="username"></el-input>
                        </el-form-item>
                        <el-form-item class="el-flex">
                            <label class="el-form-item__label">地址</label>
                            <el-input size="mini" v-model="address"></el-input>
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
        name: 'basetable',
        data() {
            return {
                pagesize:10,
                currentPage:1,
                tableData:[],
                totalCount:0,
                select_word:'',
                select_cate:'',
                del_list:[],
                multipleSelection: [],
                dialogShow2:false,
                username:'',
                address:'',
                index:0,

            }
        },
        mounted(){
            this.$store.dispatch('getUser',()=>{
                this.$nextTick(()=>{
                    this.handleSizeChange(this.pagesize)
                    this.handleCurrentChange(this.currentPage)
                })
            })
        },
        computed: {
            ...mapState(['userList'])
        },
        methods: {
            getData(){
                this.tableData = this.userList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                this.totalCount = this.userList.length
            },
            getSelect(){
                this.tableData = this.userList.filter((item=>(item.address.indexOf(this.select_cate) != -1) && (item.username.indexOf(this.select_word) != -1))).slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                this.totalCount = this.userList.filter((item=>(item.address.indexOf(this.select_cate) != -1) && (item.username.indexOf(this.select_word) != -1))).length
            },
            handleSizeChange(val) {
                this.pagesize = val
                this.getData()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getData()
            },
            handleDelete(index,row){
                let userNum = this.userList.splice(index,1)
                this.getData()
            },
            handleEdit(index,row){
                this.index = index
                this.username = row.username
                this.address = row.address
                this.dialogShow2 = true
            },
            formSubmit(){
                this.userList[this.index].username = this.username
                this.userList[this.index].address = this.address
                console.log(this.address)
                this.dialogShow2 = false
            },
            search(){
                if(this.select_cate == ''){
                    this.tableData = this.userList.filter((item=>item.username.indexOf(this.select_word) != -1)).slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                    this.totalCount = this.userList.filter((item=>item.username.indexOf(this.select_word) != -1)).length
                }else{
                    this.getSelect()
                }

            },
            selectChange(){
                if(this.select_word==''){
                    this.tableData = this.userList.filter((item=>item.address.indexOf(this.select_cate) != -1)).slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
                    this.totalCount = this.userList.filter((item=>item.address.indexOf(this.select_cate) != -1)).length
                }else {
                    this.getSelect()
                }
            },
            delAll(){
                const length = this.multipleSelection.length;
                this.del_list = this.del_list.concat(this.multipleSelection);
                let str = ''
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].username + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
                for(var i = 0;i < this.userList.length; i ++){
                    for(var j = 0;j < this.del_list.length;j++){
                        if(this.userList[i].userId == this.del_list[j].userId){
                            let userNum =  this.userList.splice(i,1)
                            this.getData()
                        }
                    }
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    }

</script>

<style>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .el-table th{overflow:visible !important}
    .el-table td, .el-table th{padding:5px 0;}
    .dialog-bg{background:rgba(0,0,0,.5);position:fixed; left:0; top:0; width:100%;height:100vh;z-index:999 !important}
    .dialog-content{width:500px;height:300px;position:absolute;left:50%;top:50%;margin-left:-250px;margin-top:-150px;background:#fff;border-radius:10px;padding:20px;box-sizing:border-box;}
    .dialog-title{font-size:16px;font-weight:bold;text-align:center;margin-bottom:15px;color:#666;}
    .dialog-main{font-size:14px;color:#777;line-height:24px;}
    .dialog-btn{text-align:center;position:absolute;right:40px;bottom:30px;}
</style>
