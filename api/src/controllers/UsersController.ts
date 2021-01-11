import { RequestHandler } from 'express'

import { encrypt } from '@/middlewares/authentication'
import User from '@/entity/user'

export class UsersController {
  /**
   * @return All Users
   **/
  all: RequestHandler = async (req, res, next) => {
    const users = await User.find()
    res.json({ users: users })
  }
  /**
   * @param id user id
   * @return   The User
   **/
  find: RequestHandler = async (req, res, next) => {
    const user = await User.findOne(req.params.id)
    res.json({ user: user })
  }

  /**
   * @param User insert user params
   * @return     Created User
   **/
  create: RequestHandler = async (req, res, next) => {
    const params = this.setParams(req.query)
    const user = User.create(params) // create instance
    const errors = await user.validate() // validate
    if (errors) {
      res.json({ errors: errors })
      return
    }
    user.password = encrypt(params.password) // encrypt password
    const createdUser = await user.save() // insert
    res.json({ user: createdUser })
  }

  // patch
  update: RequestHandler = async (req, res, next) => {
    const params = this.setParams(req.query) // クエリ
    await User.update(req.params.id, params) // パス
    res.json({ message: '更新しました！' })
  }

  // delete
  delete: RequestHandler = async (req, res, next) => {
    await User.delete(req.params.id)
    res.json({ message: '削除しました！' })
  }

  private setParams = (input: any) => {
    return {
      email: input.email,
      password: input.password,
      name: input.name,
    }
  }
}

export default new UsersController()
