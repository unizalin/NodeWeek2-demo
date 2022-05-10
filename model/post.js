const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema({
<<<<<<< HEAD
    name: {
        type: String,
        required: [true, '貼文姓名未填寫'],
    },
    nameImg:{
      type: String,
      default: 'https://picsum.photos/50/50',
    },
    tags: [
        {
            type: String,
            required: [true, '貼文標籤 tags 未填寫'],
        },
    ],
    type: {
        type: String,
        enum: ['group', 'person'],
        required: [true, '貼文類型 type 未填寫'],
    },
    image: {
        type: String,
        default: 'https://picsum.photos/300/200',
    },
    createAt: {
        type: Date,
        default: Date.now,
        select: true,
    },
    content: {
        type: String,
        required: [true, 'Content 未填寫'],
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
=======
  
  name: {
    type: String,
    required: [true, '貼文姓名未填寫']
  },
  userImage:{
    type: String,
    default: ""
  },
  tags: [
    {
      type: String,
      required: [true, '貼文標籤 tags 未填寫']
    }
  ],
  type: {
    type: String,
    enum:['group','person'],
    required: [true, '貼文類型 type 未填寫']
  },
  image: {
    type: String,
    default: ""
  },
  createAt: {
    type: Date,
    default: Date.now,
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
>>>>>>> bc54159201e9b19bb5d7984f84b6f16373a68e13
});
const posts = mongoose.model(
  'posts',
  postsSchema
  );

module.exports = posts;