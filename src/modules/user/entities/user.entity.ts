import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../entity/index';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ length: 16, comment: '名称', unique: true })
  name: string;

  @Column({ comment: '年龄', nullable: true })
  age: number;

  @Column({ length: 16, comment: '城市', nullable: true })
  city: string;
}
