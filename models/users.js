import mongoose from 'mongoose'
import validator from 'validator'

const schema = new mongoose.Schema({
  account: {
    type: String,
    required: [true, '帳號必填'],
    minlength: [4, '帳號必需要4個字以上'],
    maxlength: [20, '帳號必需要20個字以下'],
    unique: true,
    match: [/^[A-Za-z0-9]+$/, '帳號格式錯誤']
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  },
  avatar: {
    type: String
  },
  tokens: {
    type: [String]
  },
  role: {
    type: Number,
    default: 0
  }
}, { versionKey: false })

export default mongoose.model('users', schema)
