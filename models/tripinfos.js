import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '旅遊資訊標題必填']
  },
  image: {
    type: String,
    required: [true, '圖片必傳'],
    default: 'https://images.unsplash.com/photo-1493815793585-d94ccbc86df8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80'
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  user: {
    type: String
  },
  ispost: {
    type: Boolean,
    defalut: false
  },
  postdate: {
    type: Date
  }
}, { versionKey: false })

export default mongoose.model('tripinfos', Schema)
