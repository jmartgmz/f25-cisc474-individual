import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  CoursesService,
  CourseCreateIn,
  CourseUpdateIn,
  CourseDeleteIn,
} from './courses.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    console.log('User accessed:', user);
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createCourseDto: CourseCreateIn) {
    return this.coursesService.create(createCourseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  update(@Body() updateCourseDto: CourseUpdateIn) {
    return this.coursesService.update(updateCourseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  remove(@Body() deleteCourseDto: CourseDeleteIn) {
    return this.coursesService.remove(deleteCourseDto);
  }
}
