const headers = require('./headers')

function errHeader(res,data){
    res.writeHead(400,headers)
    res.write(JSON.stringify({
        "status":"false",
        "data": data
    }))
    res.end()
}

module.exports = errHeader