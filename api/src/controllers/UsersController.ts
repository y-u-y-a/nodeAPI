import { RequestHandler } from 'express'
import FilesHandler from '@/middlewares/FilesHandler'
import User from '@/entity/user'

export class UsersController {
  /**
   * Return all users
   * @param - none
   **/
  all: RequestHandler = async (req, res, next) => {
    const users = await User.find()
    res.json({ users: users })
  }
  /**
   * Return the user
   * @param user_id
   **/
  find: RequestHandler = async (req, res, next) => {
    const user = await User.findOne(req.params.id)
    res.json({ user: user })
  }

  // post
  create: RequestHandler = async (req, res, next) => {
    const file = FilesHandler.upload(req.file)
    res.json({ query: req.query, file: file })
    // const params = this.setParams(req.query)
    // let user: any = User.getRepository()
    // user = await user.save(params)
    // res.json({ user: user })
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
