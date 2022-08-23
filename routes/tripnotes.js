import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'
import { createTripnote, getMyTripnotes, getAllTripnotes, getTripnote, getMyPostTripnotes, deleteTripnote, addItineraryItem, getMyUnPostTripnotes } from '../controllers/tripnotes.js'

const router = express.Router()

// 新增、修改、刪除
router.post('/', content('multipart/form-data'), auth.jwt, upload, createTripnote)
// router.patch('/:id', content('multipart/form-data'), auth.jwt, editTripnote)
router.delete('/:id', auth.jwt, deleteTripnote)

// 搜尋
router.get('/', auth.jwt, getMyTripnotes)
router.get('/post', auth.jwt, getMyPostTripnotes)
router.get('/unpost', auth.jwt, getMyUnPostTripnotes)
router.get('/all', auth.jwt, getAllTripnotes)
router.get('/:id', auth.jwt, getTripnote)

router.post('/item', content('application/json'), auth.jwt, addItineraryItem)

export default router
