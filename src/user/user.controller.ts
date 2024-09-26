import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers()
        return res.status(HttpStatus.OK).json(users)
    }
}
