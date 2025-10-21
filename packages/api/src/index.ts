import { Link } from './links/entities/link.entity';

import { CreateLinkDto } from './links/dto/create-link.dto';
import { UpdateLinkDto } from './links/dto/update-link.dto';

import {
  CourseOut,
  CourseCreateIn,
  CourseUpdateIn,
  CourseDeleteIn,
  CourseRef,
  UserRef,
} from './dtos/courses';

export const links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto,
  },
  entities: {
    Link,
  },
};

export const courses = {
  dto: {
    CourseOut,
    CourseCreateIn,
    CourseUpdateIn,
    CourseDeleteIn,
    CourseRef,
    UserRef,
  },
};

// Direct exports for easier importing
export {
  CourseOut,
  CourseCreateIn,
  CourseUpdateIn,
  CourseDeleteIn,
  CourseRef,
  UserRef,
};
