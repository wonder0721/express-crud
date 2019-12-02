const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/crud');
const crudSchema = new Schema({
    name: {required:true,type: String},
    age: {required:true,type: Number},
    sex : {required:true,type: String},
    hobby: {required:true,type: String},
})
const Crud = mongoose.model('students', crudSchema);

// const student = new Crud({name: '佩奇', age: 6, sex:'女', hobby:'吹风机'})
// student.save().then(() => console.log('success saved'))

module.exports = Crud