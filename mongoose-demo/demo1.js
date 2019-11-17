// 在项目中引入 mongoose
const mongoose = require('mongoose');
// 连接我们本地的 test 数据库
mongoose.connect('mongodb://localhost/test');

// 创建一个模型，就是在设计数据库，约定集合的文档结构
const Cat = mongoose.model('Cat', { name: String });

// 插入一个集合
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));