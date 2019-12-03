// 在项目中引入 mongoose
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 连接我们本地的 test 数据库
mongoose.connect('mongodb://localhost/crud');

// 设计文档结构
const crudSchema = new Schema({
    name:  {required:true,type: String},
    hobby: {required:true,type: String},
    age: {required:true,type: Number},
    sex: {required:true,type: String},
})

// 将架构发布为模型
const Students = mongoose.model('students', crudSchema);

// const users = new Demo2({name:'lijiale', age: 22, sex: '男', hobby: 'LOL'})

// users.save().then(() => console.log('sucess saved'));

module.exports = Students
