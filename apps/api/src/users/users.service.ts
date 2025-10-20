import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        coursesAsInstructor: true,
        enrollments: true
      }
    });
  }

  async findInstructors() {
    return this.prisma.user.findMany({
      where: {
        role: 'INSTRUCTOR'
      },
      include: {
        coursesAsInstructor: true
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}