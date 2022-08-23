import tripnotes from '../models/tripnotes.js'
import attractions from '../models/attractions.js'

// 建立行程表
export const createTripnote = async (req, res) => {
  try {
    console.log('body', req.body)
    const result = await tripnotes.create({
      user: req.user._id,
      title: req.body.title,
      image: req.file?.path || '',
      item: req.body.item,
      ispost: req.body.ispost,
      date: {
        departure: req.body.departure,
        return: req.body.return,
        created: req.body.created,
        post: req.body.post
      }
    })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除行程表
export const deleteTripnote = async (req, res) => {
  try {
    await tripnotes.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 該使用者所有行程規劃(包含未分享)
export const getMyTripnotes = async (req, res) => {
  try {
    const result = await tripnotes.find({ user: req.user._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 該使用者分享的所有行程規劃
export const getMyPostTripnotes = async (req, res) => {
  try {
    const result = await tripnotes.find({ user: req.user._id, ispost: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
// 該使用者未分享的所有行程規劃
export const getMyUnPostTripnotes = async (req, res) => {
  try {
    const result = await tripnotes.find({ user: req.user._id, ispost: false })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 所有使用者分享的行程規劃
export const getAllTripnotes = async (req, res) => {
  try {
    const result = await tripnotes.find({ ispost: true }).populate('user', 'account')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getTripnote = async (req, res) => {
  try {
    const result = await tripnotes.findById(req.params.id).populate('user', 'account')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const addItineraryItem = async (req, res) => {
  try {
    const result = await attractions.findById(req.body.attraction)
    if (!result) {
      return res.status(404).send({ success: false, message: '景點不存在' })
    }
    req.body.item.push({ attraction: req.body.attraction })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
