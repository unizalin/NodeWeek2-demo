const headers = require('./headers')

function errHeader(res,data){
    res.writeHead(400,headers)
    res.write(JSON.stringify({
        "status":"false",
        "data": "失敗"
    }))
    res.end()
}

module.exports = errHeader