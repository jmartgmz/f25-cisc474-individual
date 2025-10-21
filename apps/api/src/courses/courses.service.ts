import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

// DTOs defined locally for now
export interface CourseCreateIn {
  title: string;
  description?: string | null;
  code: string;
  semester: string;
  instructorId: string;
  isActive?: boolean;
}

export interface CourseUpdateIn {
  id: string;
  title?: string;
  description?: string | null;
  code?: string;
  semester?: string;
  instructorId?: string;
  isActive?: boolean;
}

export interface CourseDeleteIn {
  id: string;
}

export interface UserRef {
  id: string;
  name: string | null;
  email: string;
}

export interface CourseOut {
  id: string;
  title: string;
  description: string | null;
  code: string;
  semester: string;
  instructorId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  instructor?: UserRef;
  enrollments?: Array<{ id: string }>;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CourseOut[]> {
    const courses = await this.prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        enrollments: {
          select: {
            id: true
          }
        }
      }
    });

    return courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      code: course.code,
      semester: course.semester,
      instructorId: course.instructorId,
      isActive: course.isActive,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      instructor: course.instructor,
      enrollments: course.enrollments,
    }));
  }

  async findOne(id: string): Promise<CourseOut | null> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        enrollments: {
          select: {
            id: true
          }
        }
      }
    });

    if (!course) {
      return null;
    }

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      code: course.code,
      semester: course.semester,
      instructorId: course.instructorId,
      isActive: course.isActive,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      instructor: course.instructor,
      enrollments: course.enrollments,
    };
  }

  async create(createCourseDto: CourseCreateIn): Promise<CourseOut> {
    const course = await this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        description: createCourseDto.description,
        code: createCourseDto.code,
        semester: createCourseDto.semester,
        instructorId: createCourseDto.instructorId,
        isActive: createCourseDto.isActive ?? true,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        enrollments: {
          select: {
            id: true
          }
        }
      }
    });

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      code: course.code,
      semester: course.semester,
      instructorId: course.instructorId,
      isActive: course.isActive,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      instructor: course.instructor,
      enrollments: course.enrollments,
    };
  }

  async update(updateCourseDto: CourseUpdateIn): Promise<CourseOut> {
    const { id, ...updateData } = updateCourseDto;
    
    const course = await this.prisma.course.update({
      where: { id },
      data: updateData,
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        enrollments: {
          select: {
            id: true
          }
        }
      }
    });

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      code: course.code,
      semester: course.semester,
      instructorId: course.instructorId,
      isActive: course.isActive,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      instructor: course.instructor,
      enrollments: course.enrollments,
    };
  }

  async remove(deleteCourseDto: CourseDeleteIn): Promise<CourseOut> {
    const course = await this.prisma.course.delete({
      where: { id: deleteCourseDto.id },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        enrollments: {
          select: {
            id: true
          }
        }
      }
    });

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      code: course.code,
      semester: course.semester,
      instructorId: course.instructorId,
      isActive: course.isActive,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      instructor: course.instructor,
      enrollments: course.enrollments,
    };
  }
}