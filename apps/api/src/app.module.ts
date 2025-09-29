import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { FeedbackModule } from './feedback/feedback.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    LinksModule,
    UsersModule,
    CoursesModule,
    EnrollmentsModule,
    AssignmentsModule,
    SubmissionsModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
