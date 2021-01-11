import { Entity, Column } from 'typeorm'
import { IsEmail, MinLength, MaxLength } from 'class-validator'
import { Unique } from '@/middlewares/validator'
import Base from '@/entity/base'

/**********************************************
 * @Column optionsはmigrate時に適用する内容を記述
 * その他はバリデーション時に使用される
 * name: Rename db column name
 **********************************************/
@Entity({ name: 'users' })
class User extends Base {
  @Column({ unique: true })
  @IsEmail()
  @Unique(User, { message: 'email is already exists.' })
  email!: String

  @Column()
  @MinLength(8, { message: 'required more than 8.' })
  password!: String

  @Column({ length: 50 })
  @MaxLength(50, { message: 'required less than 50 characters.' })
  name!: String
}
export default User
