import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import { Profile, ProfileDocument } from './schemas/users.profile.schema';
import { cryptoPassWord } from 'src/commons/crypto';
import { roles, statusUser } from 'src/commons/constants';
import { UsersFillterDto } from './dto/user.filter.dto';
import { validateEmail } from 'src/commons/validateEmail';
import { CommonException } from 'src/abstracts/execeptionError';
import { ValidateField } from 'src/abstracts/validateFieldById';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userSchema: Model<UsersDocument>,
    @InjectModel(Profile.name)
    private readonly profileSchema: Model<ProfileDocument>,
    private readonly validateField: ValidateField,
  ) {}

  async validateUser(usersValidateDto: Record<string, any>): Promise<void> {
    if (!validateEmail(usersValidateDto.email)) {
      new CommonException(400, `Email not correct format.`);
    }
    const options = { email: usersValidateDto.email };
    await this.validateField.existed(this.userSchema, options, 'Email');
  }

  async findByEmailAndPass(email: string, passWord: string) {
    const pass = cryptoPassWord(passWord);
    const result = await this.userSchema.findOne({
      email,
      passWord: pass,
      status: statusUser.ACTIVE,
    });
    if (result.role != roles.LIBRARIAN) {
      new CommonException(403, `Your are not permission access services.`);
    }
    return result;
  }

  async findByEmail(email: string) {
    return this.userSchema.findOne({ email });
  }

  async getProfileUser(query: object): Promise<unknown> {
    return this.profileSchema
      .find(query)
      .populate('user', '', this.userSchema)
      .exec();
  }

  async update(id: string, payload: Record<string, any>, updatedBy = '') {
    if (payload.email) {
      await this.validateUser(payload);
    }
    let updateInfo = payload;
    if (updatedBy) {
      updateInfo = {
        ...updateInfo,
        updatedBy,
      };
    }
    this.userSchema.findByIdAndUpdate(id, updateInfo);
    const result = await this.getProfileUser({ userId: id });
    return result;
  }

  async getAll(query: UsersFillterDto) {
    const { searchKey, limit, page, role, status } = query;
    const match: Record<string, any> = { $match: {} };
    if (role) {
      match.$match.role = role;
    }
    if (status) {
      match.$match.status = status;
    }
    let aggregate: any[] = [];
    const lookup = {
      $lookup: {
        from: 'profiles',
        localField: '_id',
        foreignField: 'user',
        as: 'user',
      },
    };
    aggregate = [...aggregate, match, lookup];
    if (searchKey) {
      aggregate = [
        ...aggregate,
        {
          $match: {
            $or: [
              {
                'user.firstName': new RegExp(searchKey),
                'user.lastName': new RegExp(searchKey),
              },
            ],
          },
        },
      ];
    }
    if (limit && page) {
      aggregate = [
        ...aggregate,
        {
          $skip: Number(limit) * Number(page) - Number(limit),
        },
        { $limit: Number(limit) },
      ];
    }

    const result = await this.userSchema.aggregate(aggregate);
    return result;
  }

  async findUserById(id: string): Promise<Users | any> {
    const result = await this.profileSchema
      .findOne({ user: new Types.ObjectId(id) })
      .populate('user', '', this.userSchema)
      .exec();
    return result;
  }
}
