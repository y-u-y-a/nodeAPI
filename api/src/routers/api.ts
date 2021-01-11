import { Router } from 'express'
import uploader from '@/middlewares/uploader'
import Users from '@/controllers/UsersController'

const router = Router()

// User
router.get('/users/', Users.all)
router.get('/users/:id', Users.find)
router.post('/users/', uploader.any(), Users.create)
router.patch('/users/:id', Users.update)
router.delete('/users/:id', Users.delete)

export default router
