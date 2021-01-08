import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ length: 50 })
  name?: string

  @Column()
  email?: String

  @Column()
  password?: String
}
export default User
