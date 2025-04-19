import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter, imageFileStorage } from 'src/interceptors/file-upload.intercepter';
import { UploadFileValidationPipe } from 'src/pipes/upload-validation-file.pipe';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/decorators/get-auth-user.decorator';
import { PermissionGuard } from 'src/guards/permission.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  @UseInterceptors(
    FileInterceptor("profile_picture", {
      storage: diskStorage({
        destination: imageFileStorage,
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  create(@Body() dto: SignUpDto, @UploadedFile(new UploadFileValidationPipe()) file: Express.Multer.File) {
    if (file) Object.assign(dto, { profile_picture: file?.filename })
    return this.authService.signup(dto);
  }

  @Post('log-in')
  async login(@Body() dto: SignInDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard('user_list'))
  @Get('profile')
  getProfile(@Request() req, @GetUser() user: User) {
    return req.user;
  }
}





