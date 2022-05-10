const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
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
<<<<<<< HEAD
    if (req.url === '/posts' && req.method === 'GET') {
        console.log('GET')
        const allPost = await Posts.find()
        console.log(allPost)
        successHeader(res,allPost)
=======
    
    if (req.url.includes('/posts') && req.method === 'GET') {
        const allPostCount = await Posts.count()
        //   paginate = await Posts.plugin()
        const limit = 5
        const result ={}
        if(req.url.includes('page')){
            const query =req.url.split('?')[1].split('&')
            const page = parseInt(query[0].split('=')[1])
            const allPost = await Posts.find().limit(limit).skip((page-1)*limit)

            result.page={
                total : Math.ceil(allPostCount/limit),
                nonwPage : page,
                next :{
                    page: page+1,
                    limit: limit
                },
                previous : {
                    page: page-1,
                    limit: limit
                }
            }
            result.postLists=allPost
        }else{
            const page =1
            const allPost = await Posts.find().limit(limit).skip((page-1)*limit)
            result.page={
                total : Math.ceil(allPostCount/limit),
                nonwPage : page,
                next :{
                    page: page+1,
                    limit: limit
                },
                previous : {
                    page: page-1,
                    limit: limit
                }
            }
            result.postLists=allPost
        }

        successHeader(res,result)
>>>>>>> bc54159201e9b19bb5d7984f84b6f16373a68e13
    } else if (req.url === '/posts' && req.method === 'POST') {
        console.log('POST')
        req.on('end',async()=>{
            try {
                const data = JSON.parse(body)
                console.log('data',data)
                if(data.content){
                    console.log('dadad',data.name)
                    let now = new Date().toLocaleString();
                    const newPost = await Posts.create({
                        name: data.name,
                        content: data.content,
                        tags: data.tags,
                        type: data.type,
                        image:data.image,
                        likes: 0 ,
                        comments: 0,
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
server.listen(process.env.PORT||3030)