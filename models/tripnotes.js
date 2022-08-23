import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users',
    required: [true, '缺少使用者欄位']
  },
  title: {
    type: String,
    required: [true, '行程標題必填']
  },
  image: {
    type: String,
    required: [true, '圖片必填']
  },
  date: {
    type: [
      {
        departure: {
          type: Date,
          required: [true, '出發時間必填']
        },
        return: {
          type: Date,
          required: [true, '回程時間必填']
        },
        created: {
          type: Date,
          default: Date.now()
        },
        post: {
          type: Date
        }
      }
    ]
  },
  item: {
    type: [
      {
        attraction: {
          type: mongoose.ObjectId,
          ref: 'attractions',
          required: [true, '缺少景點欄位']
        },
        spend: {
          type: Number,
          default: 0
        }
      }
    ]
  },
  ispost: {
    type: Boolean,
    defalut: false
  }
}, { versionKey: false })

export default mongoose.model('tripnotes', schema)
