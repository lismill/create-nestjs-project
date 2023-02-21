import { MaxLength, MinLength } from 'class-validator';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../entity/index';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ length: 16, comment: '名称', unique: true })
  username: string;

  @Column({ comment: '密码', select: false })
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @Column({ comment: '年龄', default: 0 })
  age: number;

  @Column({ length: 16, comment: '城市', default: '' })
  city: string;
}
