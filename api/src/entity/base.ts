import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { validate } from 'class-validator'

@Entity({ synchronize: false })
class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: Number

  @CreateDateColumn({
    name: 'created_at',
    precision: 0,
    default: () => 'NOW()',
  })
  createdAt!: Date

  @UpdateDateColumn({
    name: 'updated_at',
    precision: 0,
    default: () => 'NOW()',
  })
  updatedAt!: Date

  // methods
  public validate = async () => {
    const errors = await validate(this) // target is called instance
    const result = errors.length > 0 ? errors : null
    return result
  }
}
export default Base
