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
            res.render('index.html', data)
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
router.get('/del', (req, res) => {
    // console.log(req.query.id)
    operate.del(req.query.id,(error) => {
        if (error) {
            return res.status(500).send("Server Error")
        }
        res.redirect('/')
    })
})

// 渲染更新页面
router.get('/update', (req, res) => {
    // console.log(req.query.id)
    operate.findOne(req.query.id, (error, data) => {
        if (error) {
            return res.status(500).send("Server Error")
        }
        res.render('update.html', {student: data})
    })
})

// 更新
router.post('/update', (req, res) => {
    console.log(req.body)
    operate.update(req.body,(error,data) => {
        if (error) {
            return res.status(500).send("Server Error")
        }
        res.redirect('/')
    })
})

// 其他不存在的路由404页面
router.get('*', function (req, res) {
    res.send('404 not found');
});

// 把router导出

module.exports = router