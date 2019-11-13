const fs = require('fs')
const express = require('express')
// 引入文件操作的异步API
const operate = require('./students')
const url = require('url')

// 创建一个路由容器
const router = express.Router()

// 把所有的路由都挂载到router路由容器中

// 渲染首页展示页面
router.get('/', (req, res) => {
    operate.find((error, data) => {
        if (error) {
            res.status(500).send("Server Error")
        }
        else {
            // 通过express-art-template模板引擎进行页面渲染
            res.render('index.html',data)
        }
    })
})

// 渲染添加学生页面
router.get('/add', (req, res) => {
    res.render('add.html')
})

// 添加
router.post('/add', (req, res) => {
    operate.save(req.body, (error) => {
        if (error) {
            res.status(500).send("Server Error")
        }
        // 没有错误就跳转回首页
        else {
            res.redirect('/')
        }
    })
})

// 删除
router.post('/del', (req, res) => {
    res.send('hello world11')
})

// 渲染更新页面
router.get('/update', (req, res) => {
    console.log(req.query.id)
    res.render('update.html')
})

// 更新
router.post('/update', (req, res) => {
    console.log(req.body)
    // operate.update(id,req.body,(error,data) => {
    //     if (error) {
    //         throw error
    //     }
    //     else {
    //         res.redirect('/')
    //     }
    // })
})

// 其他不存在的路由404页面
router.get('*', function (req, res) {
    res.send('404 not found');
});

// 把router导出

module.exports = router