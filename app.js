const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

// app.use(express.static('public'));
// 如果为express.static函数所托管的文件创建虚拟路径前缀, 就可以通过带有static前缀的路径来访问static静态目录中的资源了
app.use('/public/', express.static('./public/'))

// 中间件和模板引擎的配置要在引入router之前

// 模板引擎配置 默认去views目录下查找
app.engine('html', require('express-art-template')); // 参数1：模板的后缀
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});


// 通过配置body-parser中间件，可以直接使用req.body获取post提交的数据 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 把路由容器挂载到app中
app.use(router)

app.listen(3000, () => console.log('app listening on port 3000!'))

