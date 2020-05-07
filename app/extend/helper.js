const fs = require('fs');
const axios = require('axios')
module.exports = {
    dataURLtoFile(dataurl, filename, type) {//将base64转换为文件
        // 这里拆分的是图片的base64
        let base64Data = dataurl.replace(/^data:image\/\w+;base64,/, "");
        let file = Buffer.from(base64Data, 'base64');
        if(!fs.existsSync('app/'+filename)){
            fs.mkdir('app/'+filename, (err)=>{
                if(err) throw err;
            })
        }
        const time = Date.now();
        fs.writeFile('app/'+filename+'/'+time+'.'+type, file,(err)=>{
            if(err) throw err;
        })
        return filename+'/'+time+'.'+type;
    },
    getBaseUrl() {
        return 'http://localhost:7001/' 
    },
    async getCustomOpenId(code){
        const res = await axios.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            params: {
                appid: 'appid',
                secret: 'secret',
                js_code: code,
                grant_type: 'authorization_code'
            }
        })
        return res.data.openid;
    }
}