import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { RoleEntity } from './entities/role.entity';
import { RoleDto } from './dto/role.dto';
import { usePagination } from 'src/utils/pagination';
import { HttpExceptionMessage } from 'src/enum/message';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(RoleDto: RoleDto) {
    const result = await this.roleRepository.findOne({
      where: { name: RoleDto.name },
    });
    if (result) {
      throw new HttpException(
        HttpExceptionMessage.DATA_ALREADY_EXIST,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.roleRepository.save(RoleDto);
  }

  async findAll(params?: any) {
    try {
      const { page, size, name } = params;

      const where: any = {};
      name && (where.name = Like(`%${name}%`));

      const [result, total] = await this.roleRepository.findAndCount(
        usePagination({ page, size, where }),
      );

      return { page, size, total, list: result };
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(params: any) {
    return await this.roleRepository.findOne({ where: params });
  }

  async update(id: number, RoleDto: RoleDto) {
    let result = await this.roleRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException(
        HttpExceptionMessage.DATA_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    result = { ...result, ...RoleDto };
    return await this.roleRepository.save(result);
  }

  async remove(id: number) {
    const result = await this.roleRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException(
        HttpExceptionMessage.DATA_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.roleRepository.remove(result);
  }
}
