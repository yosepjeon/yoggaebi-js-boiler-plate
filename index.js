const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const {User} = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');

// application/x-www-form-urlencoded <- 이렇게 된 데이터들을 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended:true}));

// application/json 데이터를 가져올 수 있게 해줌
app.use(bodyParser.json());

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/',(req,res) => res.send('Hello World!'));

app.post('/register',(req,res) => {
    // 회원 가입할 떄 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body);
    user.save((err,doc) => {
        if(err) {
            return res.json({success:false, err});
        }else {
            return res.status(200).json({
                success:true
            });
        }
    });
});

app.listen(port,() => console.log(`Example app listening on port ${port}`));
