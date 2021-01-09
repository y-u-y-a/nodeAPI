import { Router } from 'express'
import multer from 'multer'
import Users from '@/controllers/UsersController'

const router = Router()
const upload = multer({ dest: '../storage' })

// User
router.get('/users/', Users.all)
router.get('/users/:id', Users.find)
router.post('/users/', upload.single('userfile'), Users.create)
router.patch('/users/:id', Users.update)
router.delete('/users/:id', Users.delete)

export default router
