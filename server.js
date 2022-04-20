const http = require('http')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const errHeader =  require('./errHeader.js')
const successHeader = require('./successHeader')
const headers = require('./headers')
const Posts = require('./model/post')

dotenv.config({path:'config.env'})
const DB = process.env.DB.replace('<pwd>',process.env.DB_PASSWORD)
mongoose.connect(DB)
    .then((res)=>console.log('連上伺服器'))
        
const requestListener = async (req,res)=>{
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    })
    if (req.url === '/posts' && req.method === 'GET') {
        const allPost = await Posts.find()
        successHeader(res,allPost)
    } else if (req.url === '/posts' && req.method === 'POST') {
        req.on('end',async()=>{
            try {
                const data = JSON.parse(body)
                console.log('data',data)
                if(data.content){
                    console.log('dadad',data.name)
                    const newPost = await Posts.create({
                        name: data.name,
                        content: data.content,
                        tags: data.tags,
                        type: data.type
                    })
                    console.log(newPost)
                    successHeader(res,newPost)
                }else{
                    errHeader(res)
                }
            } catch (error) {
                console.log(error)
                errHeader(res,error)
            }
        })
       
    }else if(req.method === 'OPTION'){
        res.writeHead(200, headers);
        res.end();
    }else{
        res.writeHead(404,headers)
        res.write(JSON.stringify({
            "status":"false",
            "data": "無此網站路由"
        }))
        res.end()
    }
}


const server = http.createServer(requestListener)
server.listen(3030)