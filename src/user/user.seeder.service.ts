import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async seedUsers(): Promise<void> {
    await this.userModel.deleteMany({});

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    for (const userData of data) {
      const { name, email, phone } = userData;
      const user = await new this.userModel({ name, email, phone });
      await user.save();
    }
  }
}
