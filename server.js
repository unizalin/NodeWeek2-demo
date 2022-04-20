const http = require('http')
const mongoose = require('mongoose')
const Post = require('./model/post')
const errHeader =  require('./errHeader.js')
const successHeader = require('./successHeader')
const headers = require('./headers')

mongoose.connect('mongodb://localhost:27017/todoLists')
    .then((res)=>console.log('連上伺服器'))


    

        
const requestListener = async (req,res)=>{
    console.log(req.url)
 
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    })
    if (req.url === '/posts' && req.method === 'GET') {
        const allPost = await Post.find()
        console.log(allPost)
        successHeader(res,allPost)
    } else if (req.url === '/posts' && req.method === 'POST') {
        console.log('post')
        req.on('end',async()=>{
            try {
                const data = JSON.parse(body)
                if(data.content){
                    const newPost = await Post.create({
                        name: data.name,
                        content: data.content,
                        tags: data.tags,
                        type: data.type
                    })
                    successHeader(res,newPost)
                }else{
                    errHeader(err,data)
                }
            } catch (error) {
                errHeader(err,data)
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