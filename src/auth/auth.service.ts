import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from './dto/account.dto';
import { AccountPasswordRepository } from './account_password.repository';
import { AccountPasswordDto } from './dto/account_password.dto';
import { EmailDto } from './dto/email.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService
{
    constructor(
        @InjectRepository(AccountRepository)
        private readonly accountRepository: AccountRepository,
        @InjectRepository(AccountPasswordRepository)
        private readonly accountPasswordRepository: AccountPasswordRepository
    ) {}

    async signUp(accountDto: AccountDto, response: Response): Promise<void>
    {
        return this.accountRepository.signUp(accountDto, response);
    }

    async signIn(accountDto: AccountDto, response: Response): Promise<void>
    {
        return this.accountRepository.signIn(accountDto, response);
    }

    async updatePassword(accountPasswordDto: AccountPasswordDto, response: Response, accountId: number): Promise<void>
    {
        return this.accountRepository.updatePassword(accountPasswordDto, response, accountId);
    }

    async updateEmail(emailDto: EmailDto, accountId: number): Promise<object>
    {
        return this.accountRepository.updateEmail(emailDto, accountId);
    }

    async unban(accountId: number): Promise<object>
    {
        return this.accountRepository.unban(accountId);
    }

    async forgotPassword(accountDto: AccountDto, request: Request): Promise<object>
    {
        return this.accountPasswordRepository.forgotPassword(accountDto, request);
    }

    async resetPassword(accountPasswordDto: AccountPasswordDto, token: string): Promise<object>
    {
        return this.accountPasswordRepository.resetPassword(accountPasswordDto, token);
    }
}
