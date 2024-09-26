import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Post, Put, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers()
        return res.status(HttpStatus.OK).json(users)
    }

    @Post()
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User record has been created successfully!',
            user,
        });
    }

    @Put()
    async editUser(
        @Res() res,
        @Query('userID') userID,
        @Body() createUserDTO: CreateUserDTO,
    ) {
        const user = await this.userService.editUser(userID, createUserDTO);
        if (!user) {
            throw new NotFoundException('User does not exist.');
        }
        return res.status(HttpStatus.OK).json({
            message: 'User record has been successfully updated',
            user,
        });
    }

    @Delete()
    async deleteUser(@Res() res, @Query('userID') userID) {
        const user = await this.userService.deleteUser(userID);
        if (!user) {
            throw new NotFoundException('User does not exist.');
        }
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted!',
            user,
        });
    }
}
