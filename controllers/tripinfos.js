import tripinfos from '../models/tripinfos.js'

// 新增旅遊資訊
export const createTripInfo = async (req, res) => {
  try {
    const result = await tripinfos.create({
      name: req.body.name,
      image: req.file?.path || '',
      content: req.body.content,
      description: req.body.description,
      user: req.user.account,
      ispost: req.body.ispost,
      postdate: req.body.postdate
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

// 搜尋所有旅遊資訊(不包含未發布)
export const getTripInfos = async (req, res) => {
  try {
    const result = await tripinfos.find({ ispost: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 搜尋所有旅遊資訊(包含未發布)
export const getAllTripInfos = async (req, res) => {
  try {
    const result = await tripinfos.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 搜尋單個旅遊資訊
export const getTripInfo = async (req, res) => {
  try {
    const result = await tripinfos.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 編輯旅遊資訊
export const editTripInfo = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      content: req.body.content,
      user: req.user.account,
      description: req.body.description,
      ispost: req.body.ispost,
      postdate: req.body.postdate
    }
    if (req.file) data.image = req.file.path
    const result = await tripinfos.findByIdAndUpdate(req.params.id, data, { new: true })
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

// 刪除旅遊資訊
export const deleteTripInfo = async (req, res) => {
  try {
    await tripinfos.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
