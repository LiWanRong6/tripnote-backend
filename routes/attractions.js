import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { createAttraction, getAllAttractions, getAttraction, editAttraction, deleteAttraction } from '../controllers/attractions.js'

const router = express.Router()

// 新增、修改、刪除
router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createAttraction)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editAttraction)
router.delete('/:id', auth.jwt, admin, deleteAttraction)

// 搜尋
router.get('/all', getAllAttractions)
router.get('/:id', getAttraction)

export default router
