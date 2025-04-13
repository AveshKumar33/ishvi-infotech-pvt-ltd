import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter, imageFileStorage } from 'src/interceptors/file-upload.intercepter';
import { UploadFileValidationPipe } from 'src/pipes/upload-validation-file.pipe';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)
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
  // @UseGuards(PermissionGuard('user_create'))
  create(@Body() dto: SignUpDto, @UploadedFile(new UploadFileValidationPipe()) file: Express.Multer.File) {
    if (file) Object.assign(dto, { profile_picture: file?.filename })
    return this.authService.signup(dto);
  }

  @Post('log-in')
  async login(@Body() dto: SignInDto) {
    return this.authService.login(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}





