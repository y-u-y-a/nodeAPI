import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '@/entity/user'

export const encrypt = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10)
  return hashedPassword
}
