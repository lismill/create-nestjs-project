import { Injectable, Param } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return 'findAll';
  }
  findOneById(@Param() param: { id: string }) {
    return `findOneById ${param.id}`;
  }
  create() {
    return 'create';
  }
  update() {
    return 'update';
  }
  remove(@Param() param: { id: string }) {
    return `remove ${param.id}`;
  }
}
