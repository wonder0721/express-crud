// 数据操作文件模块
// 只处理数据 不关系业务

const fs = require('fs')
const dbPath = './db.json'

// 获取所有学生列表
exports.find = function (callback) {
    fs.readFile('./db.json', 'utf-8', (error, data) => {
        if (error) {
            return callback(error)
        }
        else {
            // 没有error要传null不然会将data当做error
            callback(null, JSON.parse(data))
        }
    })
}

// 通过id查找对应的学生对象
exports.findOne = function(id,callback){
    fs.readFile(dbPath,(error,data) => {
        if (error) {
            callback(error)
        }
        else {
            let target = JSON.parse(data).students.find((item) => {
               return item.id == id
            })
            callback(null,target)
        }
    })
}


// 添加保存
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', (error, data) => {
        if (error) {
            return callback(error)
        }
        else {
            let studentsArr = JSON.parse(data).students
            student.id = studentsArr.length!=0?studentsArr[studentsArr.length - 1].id + 1:1
            // console.log(student)
            studentsArr.push(student)
            let newStudentsData = JSON.stringify({ students: studentsArr })
            fs.writeFile(dbPath, newStudentsData, (error) => {
                if (error) {
                    callback(error)
                }
                else {
                    // 没有错误就不发出错误 传参null
                    callback(null)
                }
            })
        }
    })
}
// 更新修改
exports.update = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', (error, data) => {
        if (error) {
            return callback(error)
        }
        else { 
            let studentsArr = JSON.parse(data).students
            studentsArr.some((item) => {
                if (item.id == student.id) {
                    for(var key in item){
                        item[key] = student[key]
                    }
                    return true
                }
            })
            let newStudentsData = JSON.stringify({ students: studentsArr })
            fs.writeFile(dbPath, newStudentsData, (error) => {
                if (error) {
                    callback(error)
                }
                else {
                    // 没有错误就不发出错误 传参null
                    callback(null)
                }
            })
        }
    })
}
// 删除学生
exports.del = function (id, callback) { 
    fs.readFile(dbPath, 'utf-8', (error, data) => {
        if (error) {
            return callback(error)
        }
        else { 
            let studentsArr = JSON.parse(data).students
            studentsArr.some((item,index) => {
                if (item.id == id) {
                    studentsArr.splice(index,1)
                    return true
                }
            })
            let newStudentsData = JSON.stringify({ students: studentsArr })
            fs.writeFile(dbPath, newStudentsData, (error) => {
                if (error) {
                    callback(error)
                }
                else {
                    // 没有错误就不发出错误 传参null
                    callback(null)
                }
            })
        }
    })
}
