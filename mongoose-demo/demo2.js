// 在项目中引入 mongoose
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 连接我们本地的 test 数据库
mongoose.connect('mongodb://localhost/demo2');

// 设计文档结构
const demo2Schema = new Schema({
    username:  {required:true,type: String},
    password: {required:true,type: String},
    email :String
})

// 将架构发布为模型
const Demo2 = mongoose.model('Demo2', demo2Schema);

// // 增加
// const users = new Demo2({username:'wonder', password:34543534, email:'6756@qq.com'})

// // 持久化数据
// users.save().then(() => console.log('sucess saved'));

// 查询
// Demo2.find((error,data) => {
//     if(error){
//         console.log('error')
//     }
//     else {
//         console.log(data)
//     }
// })

// Demo2.find({username:'tom'},(error,data) => {
//     if(error){
//         console.log('error')
//     }
//     else {
//         console.log(data)
//     }
// })

// Demo2.findOne({username:'jerry'},(error,data) => {
//     if(error){
//         console.log('error')
//     }
//     else {
//         console.log(data)
//     }
// })

// 更新
Demo2.updateOne({username:'tom'},{$set:{password:123}},(error,data) => {
    if (error) {
        console.log("error")
    }
    else {
        console.log("success change")
    }
})

// 删除
// Demo2.deleteOne({username:'wonder'},(error,data) => {
//     if(error){
//         return console.log("error")
//     }
//     console.log("success delete")
// })