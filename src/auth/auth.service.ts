import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

import { User } from 'src/schemas/user.schema';
import { CreateUserDto, LoginUserDto } from './dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async createUser(userDto: CreateUserDto) {

        const { password } = userDto

        try {

            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            const createdUser = new this.userModel({ ...userDto, password: hash });
            const newUser = await createdUser.save();
            const { _id, username, email } = newUser;

            return {
                ok: true,
                username,
                email,
                _id,
                access_token: await this.jwtService.signAsync({ _id, username }),
            };


        } catch (error) {
            throw new BadRequestException('Email already exists')
        }
    }

    async login(userDto: LoginUserDto) {

        const { email, password } = userDto;

        const user = await this.userModel.findOne({ email });
        if (!user) {
            console.log('world');

            throw new BadRequestException('Invalid email or password //email');
        }

        const isCorrectPassword = bcrypt.compareSync(password, user.password);
        if (!isCorrectPassword) {

            throw new BadRequestException('Invalid email or password //password')
        } else {

            const { _id, email, username } = user

            return {
                ok: true,
                username,
                email,
                _id,
                access_token: await this.jwtService.signAsync({ _id, username }),
            }
        }


    }

    async renewToken(req: any) {
        
        const {_id, username} = req.user;

        const access_token = await this.jwtService.signAsync({ _id, username });

        return {
            ok: true,
            _id,
            username,
            access_token,

        }
    }
}
