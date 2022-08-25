import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'
import {
  createTripnote,
  postTripnote,
  getMyTripnotes,
  getAllTripnotes,
  getTripnote,
  getMyPostTripnotes,
  deleteTripnote,
  addItineraryItem,
  getMyUnPostTripnotes,
  editItineraryItem
} from '../controllers/tripnotes.js'

const router = express.Router()

// 新增、修改、刪除
router.post('/', content('multipart/form-data'), auth.jwt, upload, createTripnote)
router.patch('/post/:id', auth.jwt, postTripnote)
router.delete('/:id', auth.jwt, deleteTripnote)

// 搜尋
router.get('/', auth.jwt, getMyTripnotes)
router.get('/post', auth.jwt, getMyPostTripnotes)
router.get('/unpost', auth.jwt, getMyUnPostTripnotes)
router.get('/all', auth.jwt, getAllTripnotes)
router.get('/userall', getAllTripnotes)
router.get('/:id', auth.jwt, getTripnote)

router.post('/item', content('application/json'), auth.jwt, addItineraryItem)
router.patch('/item/:id', auth.jwt, editItineraryItem)

export default router
