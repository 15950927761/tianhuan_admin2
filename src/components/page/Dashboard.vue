<template>
    <div class="dashboard">
        <section>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-card shadow="hover" class="mgb20" style="height:100px;">
                        <div class="user-info">
                            <img src="../../assets/img/img.jpg" class="user-avator" alt="">
                            <div class="user-info-cont">
                                <div class="user-info-name">{{name}}</div>
                                <div>{{role}}</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-1">
                            <i class="iconfont icon-touxiang grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">1234</div>
                                <div>用户访问量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-2">
                            <i class="iconfont icon-dingdan grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">321</div>
                                <div>系统消息</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-3">
                            <i class="iconfont icon-zidingyi2 grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">5000</div>
                                <div>数量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-card shadow="hover" style="height:420px;margin-bottom:20px;">
                <div slot="header" class="clearfix">
                    <span>最新订单列表</span>
                    <el-button style="float: right; padding: 3px 0;font-size:14px;" type="text" @click="linkTo">查看更多>></el-button>
                </div>
                <el-table
                        :data="tableData"
                        height="330"
                        border
                        style="width: 100%;font-size:14px !important;">
                    <el-table-column
                            prop="orderId"
                            label="订单号"
                            width="180" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="收货人"
                            width="100" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="金额"
                            width="100" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="收货地址"
                            width="300" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="订单状态"
                            width="80" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="发货时间" align="center">
                    </el-table-column>
                </el-table>
            </el-card>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-card shadow="hover">
                        <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover">
                        <schart ref="line" class="schart" canvasId="line" :data="data2" type="line" :options="options2"></schart>
                    </el-card>
                </el-col>
            </el-row>
        </section>
    </div>
</template>

<script>
    import Schart from 'vue-schart'
    import bus from '../common/bus'
    import {mapState,mapActions} from 'vuex'
    export default {
        data(){
            return {
                // name:localStorage.getItem('ms_username'),
                name:"admin",
                data: [
                    {
                    name: '09/04',
                    value: 1083
                    },
                    {
                        name: '09/05',
                        value: 941
                    },
                    {
                        name: '09/06',
                        value: 1139
                    },
                    {
                        name: '09/07',
                        value: 816
                    },
                    {
                        name: '09/08',
                        value: 327
                    },
                    {
                        name: '09/09',
                        value: 228
                    },
                    {
                        name: '09/10',
                        value: 1065
                    }
                ],
                data2: [{
                    name: '09/04',
                    value: 11083
                },
                    {
                        name: '09/05',
                        value: 1941
                    },
                    {
                        name: '09/06',
                        value: 4339
                    },
                    {
                        name: '09/07',
                        value: 3416
                    },
                    {
                        name: '09/08',
                        value: 5527
                    },
                    {
                        name: '09/09',
                        value: 5628
                    },
                    {
                        name: '09/10',
                        value: 3165
                    }
                ],
                options: {
                    title: '最近七天每天的用户访问量',
                    showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: '最近七天订单增减趋势',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD',
                    contentColor: '#EEEEEE',
                    bottomPadding: 30,
                    topPadding: 30
                }
            }
        },
        created(){
          this.handleListener();
        },
        computed:{
            ...mapState(['orderList']),
            tableData(){
                return this.orderList.slice(0,10);
            },
            role(){
                return this.name === 'admin' ? '超级管理员' : '普通用户'
            }
        },
        mounted(){
            this.$store.dispatch('getOrder')
        },
        methods:{
            handleListener(){
                bus.$on('collapse',this.handleBus);
                window.addEventListener('resize',this.renderChart)
            },
            handleBus(msg){
              setTimeout(()=>{
                  this.renderChart()
              },300)
            },
            renderChart(){
              this.$refs.bar.renderChart()
            },
            linkTo(){
              //跳转到订单用户列表页面
              this.$router.push('orderlist')
            }
        },
        components:{
            Schart
        }
    }
</script>

<style>
    .dashboard{background:#fff;padding:15px;font-size:14px;box-sizing:border-box;}
    .dashboard .el-card__body{
        padding:5px;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding:5px;
    }

    .user-avator {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position:relative;
        top:10px;
    }

    .user-info-cont {
        padding-left: 10px;
        flex: 1;
        font-size: 12px;
        color: #555;
        padding-top:15px;
    }

    .user-info-cont div:first-child {
        font-size: 24px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
    .el-table__row{
        font-size:14px;
    }
</style>
