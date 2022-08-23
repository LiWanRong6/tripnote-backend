import attractions from '../models/attractions.js'

// 新增景點
export const createAttraction = async (req, res) => {
  try {
    const result = await attractions.create({
      name: req.body.name,
      address: req.body.address,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      image: req.file?.path || '',
      description: req.body.description,
      official: req.body.official,
      phone: req.body.phone
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

// 搜尋所有景點
export const getAllAttractions = async (req, res) => {
  try {
    const result = await attractions.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 搜尋單個景點
export const getAttraction = async (req, res) => {
  try {
    const result = await attractions.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 編輯景點資訊
export const editAttraction = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      address: req.body.address,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      description: req.body.description,
      official: req.body.official,
      phone: req.body.phone
    }
    if (req.file) data.image = req.file.path
    const result = await attractions.findByIdAndUpdate(req.params.id, data, { new: true })
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

// 刪除景點
export const deleteAttraction = async (req, res) => {
  try {
    await attractions.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
