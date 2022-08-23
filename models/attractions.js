import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: '未命名景點',
    required: [true, '景點名稱必填']
  },
  address: {
    type: String
  },
  // 經度
  longitude: {
    type: Number
  },
  // 緯度
  latitude: {
    type: Number
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  official: {
    type: String,
    default: '沒有網站'
  },
  phone: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('attractions', Schema)
