<template>
    <div class="visitorpie">
        <div id="visitorpie" style="width:90%;height:600px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';

    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('visitorpie'));
            this.initData()
        },
        methods:{
            initData(){
                const option = {
                    title : {
                        text: '用户分布',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['北京(300)','上海(100)','深圳(200)','杭州(300)','其他(100)']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:300, name:'北京(300)'},
                                {value:100, name:'上海(100)'},
                                {value:200, name:'深圳(200)'},
                                {value:300, name:'杭州(300)'},
                                {value:100, name:'其他(100)'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                this.myChart.setOption(option);
            }
        }
    }
</script>

<style>
    .visitorpie{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
