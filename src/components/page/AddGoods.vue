<template>
    <div class="addgoods">
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">选择食品种类</header>
                <el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
                    <el-row class="category_select">
                        <el-form-item label="食品种类">
                            <el-select v-model="categoryForm.categorySelect" style="width:100%;">
                                <el-option
                                        v-for="item in categoryForm.categoryList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
                        <div class="add_category">
                            <el-form-item label="食品种类" prop="name">
                                <el-input v-model="categoryForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="种类描述" prop="description">
                                <el-input v-model="categoryForm.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
                            </el-form-item>
                        </div>
                    </el-row>
                    <div class="add_category_button">
                        <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
                        <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
                        <span>添加食品种类</span>
                    </div>
                </el-form>
                <header class="form_header">添加食品</header>
                <el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
                    <el-form-item label="食品名称" prop="name">
                        <el-input v-model="foodForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="食品活动" prop="activity">
                        <el-input v-model="foodForm.activity"></el-input>
                    </el-form-item>
                    <el-form-item label="食品详情" prop="description">
                        <el-input v-model="foodForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="图片上传" prop="description">
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="食品规格">
                        <el-radio class="radio" v-model="foodSpecs" label="one">单规格</el-radio>
                        <el-radio class="radio" v-model="foodSpecs" label="more">多规格</el-radio>
                    </el-form-item>
                    <el-row v-if="foodSpecs == 'one'">
                        <el-form-item label="包装费">
                            <el-input-number v-model="foodForm.specs[0].packing_fee" :min="0" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="价格">
                            <el-input-number v-model="foodForm.specs[0].price" :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row v-else style="overflow: auto; text-align: center;">
                        <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
                        <el-table
                                :data="foodForm.specs"
                                style="margin-bottom: 20px;"
                                :row-class-name="tableRowClassName">
                            <el-table-column
                                    prop="specs"
                                    label="规格">
                            </el-table-column>
                            <el-table-column
                                    prop="packing_fee"
                                    label="包装费">
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="价格">
                            </el-table-column>
                            <el-table-column label="操作" >
                                <template slot-scope="scope">
                                    <el-button
                                            size="small"
                                            type="danger"
                                            @click="handleDelete(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary">确认添加食品</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title="添加规格" v-model="dialogFormVisible">
                    <el-form :rules="specsFormrules" :model="specsForm">
                        <el-form-item label="规格" label-width="100px" prop="specs">
                            <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="包装费" label-width="100px">
                            <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="价格" label-width="100px">
                            <el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                restaurant_id: 1,
                categoryForm: {
                    categoryList: [],
                    categorySelect: '',
                    name: '',
                    description: '',
                },
                dialogImageUrl: '',
                dialogVisible: false,
                foodForm: {
                    name: '',
                    description: '',
                    image_path: '',
                    activity: '',
                    attributes: [],
                    specs: [{
                        specs: '默认',
                        packing_fee: 0,
                        price: 20,
                    }],
                },
                foodrules: {
                    name: [
                        { required: true, message: '请输入食品名称', trigger: 'blur' },
                    ],
                },
                attributes: [{
                    value: '新',
                    label: '新品'
                }, {
                    value: '招牌',
                    label: '招牌'
                },],
                showAddCategory: false,
                foodSpecs: 'one',
                dialogFormVisible: false,
                specsForm: {
                    specs: '',
                    specs: '',
                    packing_fee: 0,
                    price: 20,
                },
                specsFormrules: {
                    specs: [
                        { required: true, message: '请输入规格', trigger: 'blur' },
                    ],
                }
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>

<style>
    .form{
        min-width: 400px;
        margin-bottom: 30px;
    }
    .food_form{
        border: 1px solid #eaeefb;
        padding: 10px 10px 0;
    }
    .form_header{
        text-align: center;
        margin-bottom: 10px;
    }
    .category_select{
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }
    .add_category_row{
        height: 0;
        overflow: hidden;
        transition: all 400ms;
        background: #f9fafc;
    }
    .showEdit{
        height: 185px;
    }
    .add_category{
        background: #f9fafc;
        padding: 10px 30px 0px 10px;
        border: 1px solid #eaeefb;
        border-top: none;
    }
    .add_category_button {
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #eaeefb;
        border-top: none;
        transition: all 400ms;
    }
    .add_category_button:hover{
         background: #f9fafc;
     }
    span, .edit_icon{
        color: #20a0ff;
    }
    .sc{
    transition: all 400ms;
        font-size:14px;
    }
    .edit_icon{
        color: #ccc;
        transition: all 400ms;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .cell{
        text-align: center;
    }
    .el-button--primary span{color:#fff;}
</style>
