const express = require('express');

const app = express();
app.use('/static',express.static('./static'));
app.use('/api/home', require('./routers/homeRouter'));
app.use('/api/exchange', require('./routers/exchangeRouter'));

app.listen(9000, (error)=>{
    if(error)
        console.log('启动失败');
    else
        console.log('启动成功');
})