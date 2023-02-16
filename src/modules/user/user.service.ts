import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Encrypt } from '../../utils/crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = Encrypt(createUserDto.password);
    return await this.userRepository.save(createUserDto);
  }

  async findAll(params?: any) {
    return await this.userRepository.find({ where: params });
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
      throw new HttpException('DATA_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }
    delete updateUserDto?.id;
    result = { ...result, ...updateUserDto };
    return await this.userRepository.save(result);
  }

  async remove(id: number) {
    const result = await this.userRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException('DATA_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.remove(result);
  }
}
