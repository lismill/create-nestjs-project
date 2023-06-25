import { MaxLength, MinLength } from 'class-validator';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../entity/index';

@Entity({ name: 'l_user' })
export class UserEntity extends BaseEntity {
  @Column({ comment: '用户名称', default: '' })
  @MinLength(8)
  @MaxLength(16)
  username: string;

  @Column({ comment: '密码', select: false })
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @Column({ length: 11, comment: '手机号', default: '' })
  phone: string;

  @Column({ length: 16, comment: '昵称', default: '' })
  nickname: string;

  @Column({ length: 256, comment: '头像', default: '' })
  image: string;

  @Column({ comment: '用户类型', default: 1 })
  type: number;

  @Column({ comment: '用户状态', default: 1 })
  status: number;
}
