const http = require('http')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todoLists')
    .then((res)=>console.log('連上伺服器'))

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '貼文姓名未填寫']
    },
    tags: [
    {
        type: String,
        required: [true, '貼文標籤 tags 未填寫']
    }
    ],
    image: {
    type: String,
    default: ""
    },
    createAt: {
    type: Date,
    default: Date.now,
    select: false
    },
    content: {
    type: String,
    required: [true, 'Content 未填寫'],
    },
    likes: {
    type: Number,
    default: 0
    },
    comments:{
    type: Number,
    default: 0
      },
    })
    
const Post = mongoose.model('Post',postSchema)
const testPost = new Post(
    {
        "name": "data.name",
        "content": "data.content",
        "tags": "data.tags",
})

        testPost.save()
            .then((res)=> console.log('新增成功'))
const requestListener = async (req,res)=>{
    console.log(req.url)
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
        'Content-Type': 'application/json'
    };
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    })
    if (req.url === '/posts' && req.method === 'GET') {
        const post = await Post.find()
        res.writeHead(200,headers)
        res.write(JSON.stringify({
            "status":"success",
            "data": post
        }));
        res.end()
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
                    res.writeHead(200,headers)
                    res.write(JSON.stringify({
                        "status":"success",
                        "data":newPost
                    }))
                    res.end()
                }else{
                    res.writeHead(400,headers)
                    res.write(JSON.stringify({
                        "status":"false",
                        "data": "失敗"
                    }))
                    res.end()
                }
            } catch (error) {
                res.writeHead(400,headers)
                res.write(JSON.stringify({
                    "status":"false",
                    "data": "失敗"
                }))
                res.end()
            }
        })
       
    }else if(req.method === 'OPTION'){
        res.writeHead(200, headers);
        res.end();
    }else{
        res.writeHead(400,headers)
        res.write(JSON.stringify({
            "status":"false",
            "data": "失敗"
        }))
        res.end()
    }
}


const server = http.createServer(requestListener)
server.listen(3030)