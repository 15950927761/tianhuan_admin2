<template>
    <div class="addshop">
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="店铺名称" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-autocomplete
                                v-model="formData.address"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入地址"
                                style="width: 100%;"
                        ></el-autocomplete>
                        <span>当前城市：{{city.name}}</span>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.number="formData.phone" maxLength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺简介" prop="description">
                        <el-input v-model="formData.description"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺标语" prop="promotion_info">
                        <el-input v-model="formData.promotion_info"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺分类">
                        <el-cascader
                                :options="categoryOptions"
                                v-model="selectedCategory"
                                change-on-select
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="店铺特点" style="white-space: nowrap;">
                        <span>品牌保证</span>
                        <el-switch on-text="" off-text="" v-model="formData.is_premium"></el-switch>
                        <span>新开店铺</span>
                        <el-switch on-text="" off-text="" v-model="formData.new"></el-switch>
                    </el-form-item>
                    <el-form-item label="配送费" prop="float_delivery_fee">
                        <el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
                    </el-form-item>
                    <el-form-item label="起送价" prop="float_minimum_order_amount">
                        <el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="营业时间" style="white-space: nowrap;">
                        <el-time-select
                                placeholder="起始时间"
                                v-model="formData.startTime"
                                :picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}">
                        </el-time-select>
                        <el-time-select
                                placeholder="结束时间"
                                v-model="formData.endTime"
                                :picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}">
                        </el-time-select>
                    </el-form-item>
                    <el-form-item label="优惠活动">
                        <el-select v-model="activityValue" :placeholder="activityValue">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="button_submit">
                        <el-button type="primary">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                city:{},
                restaurants:[],
                timeout:null,
                formData:{
                    name:'',
                    address:'',
                    latitude:'',
                    longitude:'',
                    description:'',
                    phone:'',
                    promotion_info:'',
                    float_delivery_fee:5,
                    float_minimum_order_amount:20,
                    is_premium:true,
                    delivery_mode:true,
                    new:true,
                    bao:true,
                    zhun:true,
                    piao:true,
                    startTime:'',
                    endTime:'',
                    image_path:'',
                    business_license_image:'',
                    catering_service_license_image:''
                },
                rules:{
                    name:[
                        { required:true, message:'请输入店铺名称',trigger:'blur' }
                    ],
                    phone:[
                        { required:true,message:'请输入联系电话' },
                        { type:'number',message:'电话号码必须是数字' }
                    ]
                },
                options:[{
                    value:'满减优惠',
                    label:'满减优惠'
                },{
                    value:'优惠大酬宾',
                    label:'优惠大酬宾'
                },{
                    value:'新用户立减',
                    label:'新用户立减'
                },{
                    value:'进店领券',
                    label:'进店领券'
                }],
                activityValue:'满减优惠',
                activities:[{
                    icon_name:'减',
                    name:'满减优惠',
                    description:'满30减5，满60关系8',
                }],
                baseUrl:'//elm.cangdu.org',
                baseImgPath:'//elm.cangdu.org/img/',
                categoryOptions:[],
                selectedCategory:['快餐便当','简餐']
            }
        },
        methods:{
            loadAll() {
                return [
                    { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                    { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                    { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                    { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                    { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                    { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                    { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                    { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                    { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                    { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
                    { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
                    { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
                    { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
                    { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
                    { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
                    { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
                    { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
                    { "value": "枪会山", "address": "上海市普陀区棕榈路" },
                    { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
                    { "value": "钱记", "address": "上海市长宁区天山西路" },
                    { "value": "壹杯加", "address": "上海市长宁区通协路" },
                    { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
                    { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
                    { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
                    { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
                    { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
                    { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
                    { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
                    { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
                    { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
                    { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
                    { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
                    { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
                    { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
                    { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
                    { "value": "浏阳蒸菜", "address": "天山西路430号" },
                    { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
                    { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
                    { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
                    { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
                    { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
                    { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
                    { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
                    { "value": "阳阳麻辣烫", "address": "天山西路389号" },
                    { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
                ];
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
        }
    }
</script>

<style>
    .addshop .el-form-item{margin-bottom:20px;}
    .el-switch{margin:0 5px;}
</style>
