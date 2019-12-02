const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
// 引入文件操作的异步API
// const operate = require('./students')
// const url = require('url')
const Students = require('./db')

// 创建一个路由容器
const router = express.Router()

// 把所有的路由都挂载到router路由容器中

// 渲染首页展示页面
router.get('/', (req, res) => {
    Students.find().then((data) => {
        // console.log(data)
        res.render('index.html',{students: data})
    })
})

// 渲染添加学生页面
router.get('/add', (req, res) => {
    res.render('add.html')
})

// 添加
router.post('/add', (req, res) => {
    console.log(req.body)
    new Students(req.body).save().then(() => {
        res.redirect('/')
    }).catch((err) => {
        res.status(500).send("Server Error")
    })
})

// 删除
router.get('/del', (req, res) => {
    // console.log(req.query.id)
    Students.deleteOne({_id: mongoose.Types.ObjectId(req.query.id)}).then(() => {
        res.redirect('/')
    }).catch((err) => {
        res.status(500).send("Server Error")
    })
})

// 渲染更新页面
router.get('/update', (req, res) => {
    // console.log(req.query.id)
    Students.findOne({_id: mongoose.Types.ObjectId(req.query.id)}).then((data) => {
    // console.log(data)
        res.render('update.html', {student: data})
    })
})

// 更新
router.post('/update', (req, res) => {
    console.log(req.body)
    Students.updateOne({_id: mongoose.Types.ObjectId(req.body._id)},{$set:req.body}).then(() => {
        res.redirect('/')
    }).catch((err) => {
        res.status(500).send("Server Error")
    })
})

// 其他不存在的路由404页面
router.get('*', function (req, res) {
    res.send('404 not found');
});

// 把router导出

module.exports = router