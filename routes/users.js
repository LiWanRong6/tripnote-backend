import express from 'express'
import * as auth from '../middleware/auth.js'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import { register, login, logout, extend, getUser, getAllUsers, deleteUser } from '../controllers/users.js'

const router = express.Router()

// 新增、修改、刪除
router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.post('/extend', auth.jwt, extend)
router.delete('/logout', auth.jwt, logout)
router.delete('/:id', auth.jwt, admin, deleteUser)

// 搜尋會員
router.get('/', auth.jwt, getUser)
router.get('/all', auth.jwt, admin, getAllUsers)

export default router
