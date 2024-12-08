const jwt = require('jsonwebtoken');

const Token = {
    //data为加密数据
    encrypt: function (data) {
        return jwt.sign(data, 'token')
    },
    decrypt: function (token) {
        try {
            let data = jwt.verify(token, 'token');
            return {
                token: true,
                id: data.id
            };
        } catch (e) {
            return {
                token: false,
                data: e
            }
        }
    }
}

export default Token