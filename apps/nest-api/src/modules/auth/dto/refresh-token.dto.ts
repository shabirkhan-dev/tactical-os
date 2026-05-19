import { IsString, MinLength } from 'class-validator';

export class RefreshTokenDto {
	@IsString()
	@MinLength(1)
	refreshToken!: string;
}
