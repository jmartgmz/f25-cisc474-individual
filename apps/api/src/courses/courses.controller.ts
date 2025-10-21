import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CoursesService, CourseCreateIn, CourseUpdateIn, CourseDeleteIn } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post('create')
  create(@Body() createCourseDto: CourseCreateIn) {
    return this.coursesService.create(createCourseDto);
  }

  @Patch('update')
  update(@Body() updateCourseDto: CourseUpdateIn) {
    return this.coursesService.update(updateCourseDto);
  }

  @Delete('delete')
  remove(@Body() deleteCourseDto: CourseDeleteIn) {
    return this.coursesService.remove(deleteCourseDto);
  }
}
