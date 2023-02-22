import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Encrypt } from '../../utils/crypto';
import { usePagination } from 'src/utils/pagination';
import { HttpExceptionMessage } from 'src/enum/message';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (result) {
      throw new HttpException('用户名已存在', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    createUserDto.password = Encrypt(createUserDto.password);
    const user = await this.userRepository.save(createUserDto);
    delete user.password;
    return user;
  }

  async findAll(params?: any) {
    try {
      const { page, size, username } = params;

      const where: any = {};
      username && (where.username = Like(`%${username}%`));

      const [result, total] = await this.userRepository.findAndCount(
        usePagination({ page, size, where }),
      );

      return { page, size, total, list: result };
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(params: any) {
    return await this.userRepository.findOne({ where: params });
  }

  async findPasswordByName(params: any) {
    return await this.userRepository
      .createQueryBuilder()
      .select('*')
      .where('username = :username', params)
      .getRawOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let result = await this.userRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException(
        HttpExceptionMessage.DATA_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    delete updateUserDto?.id;
    result = { ...result, ...updateUserDto };
    return await this.userRepository.save(result);
  }

  async remove(id: number) {
    const result = await this.userRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException(
        HttpExceptionMessage.DATA_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userRepository.remove(result);
  }
}
