import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../entity/index';

@Entity({ name: 'l_role' })
export class RoleEntity extends BaseEntity {
  @Column({ length: 16, comment: '权限名称', unique: true })
  name: string;

  @Column({ comment: '权限节点', default: '' })
  nodes: string;
}
