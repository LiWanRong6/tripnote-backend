import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { createTripInfo, getTripInfos, getAllTripInfos, getTripInfo, editTripInfo, deleteTripInfo } from '../controllers/tripinfos.js'

const router = express.Router()

// 新增、修改、、刪除
router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createTripInfo)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, editTripInfo)
router.delete('/:id', auth.jwt, admin, deleteTripInfo)

// 搜尋
router.get('/', getTripInfos)
router.get('/all', getAllTripInfos)
router.get('/:id', getTripInfo)

export default router
