import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter, imageFileStorage } from 'src/interceptors/file-upload.intercepter';
import { UploadFileValidationPipe } from 'src/pipes/upload-validation-file.pipe';
import { PermissionGuard } from 'src/guards/permission.guards';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('list')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor("profile_picture", {
      storage: diskStorage({
        destination: imageFileStorage,
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile(new UploadFileValidationPipe()) file: Express.Multer.File) {
    if (file) Object.assign(updateUserDto, { profile_picture: file?.filename })
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard('orders_create', 'orders_view'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
