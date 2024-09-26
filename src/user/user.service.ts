import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const user = await new this.userModel(createUserDTO);
        return user.save();
    }

    async editUser(userID, createPostDTO: CreateUserDTO): Promise<User> {
        return await this.userModel.findByIdAndUpdate(userID, createPostDTO, { new: true });
    }

    async deleteUser(userID): Promise<any> {
        return await this.userModel.findByIdAndDelete(userID);
    }
}
