import { prisma } from './client';
import * as fs from 'fs';
import * as path from 'path';

// Helper function to read JSON files
function readJsonFile(filename: string) {
  const filePath = path.join(__dirname, '..', 'seed-data', filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

// Load seed data from JSON files
const DEFAULT_USERS = readJsonFile('users.json');
const DEFAULT_COURSES = readJsonFile('courses.json');
const DEFAULT_ENROLLMENTS = readJsonFile('enrollments.json');
const DEFAULT_ASSIGNMENTS = readJsonFile('assignments.json');
const DEFAULT_SUBMISSIONS = readJsonFile('submissions.json');
const DEFAULT_FEEDBACK = readJsonFile('feedback.json');

async function main() {
  console.log('🌱 Seeding database...');

  // Create users
  const users = new Map();
  for (const userData of DEFAULT_USERS) {
    const user = await prisma.user.upsert({
      where: { email: userData.email! },
      update: userData,
      create: userData,
    });
    users.set(userData.email, user);
    console.log(`✅ Created/updated user: ${user.name}`);
  }

  // Create courses
  const courses = new Map();
  for (const courseData of DEFAULT_COURSES) {
    const instructor = users.get(courseData.instructorEmail);
    const { instructorEmail, ...courseInfo } = courseData;

    const course = await prisma.course.upsert({
      where: { code: courseData.code },
      update: { ...courseInfo, instructorId: instructor.id },
      create: { ...courseInfo, instructorId: instructor.id },
    });
    courses.set(courseData.code, course);
    console.log(`✅ Created/updated course: ${course.title}`);
  }

  // Create enrollments (students in courses)
  for (const enrollment of DEFAULT_ENROLLMENTS) {
    const course = courses.get(enrollment.courseCode);
    for (const studentEmail of enrollment.students) {
      const student = users.get(studentEmail);
      await prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: student.id,
            courseId: course.id,
          },
        },
        update: {},
        create: {
          userId: student.id,
          courseId: course.id,
        },
      });
    }
    console.log(`✅ Created enrollments for course: ${enrollment.courseCode}`);
  }

  // Create assignments
  const assignments = new Map();
  for (const assignmentData of DEFAULT_ASSIGNMENTS) {
    const course = courses.get(assignmentData.courseCode);
    const { courseCode, dueDate, ...assignmentInfo } = assignmentData;

    const assignment = await prisma.assignment.upsert({
      where: {
        id: `${course.id}-${assignmentData.title}`, // Temporary unique key
      },
      update: {
        ...assignmentInfo,
        courseId: course.id,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      create: {
        ...assignmentInfo,
        courseId: course.id,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
    assignments.set(assignmentData.title, assignment);
    console.log(`✅ Created/updated assignment: ${assignment.title}`);
  }

  // Create submissions
  const submissionMap = new Map();
  for (const submissionData of DEFAULT_SUBMISSIONS) {
    const assignment = assignments.get(submissionData.assignmentTitle);
    const user = users.get(submissionData.userEmail);
    const { assignmentTitle, userEmail, submittedAt, ...submissionInfo } =
      submissionData;

    const submission = await prisma.submission.upsert({
      where: {
        assignmentId_userId: {
          assignmentId: assignment.id,
          userId: user.id,
        },
      },
      update: {
        ...submissionInfo,
        submittedAt: submittedAt ? new Date(submittedAt) : null,
      },
      create: {
        ...submissionInfo,
        assignmentId: assignment.id,
        userId: user.id,
        submittedAt: submittedAt ? new Date(submittedAt) : null,
      },
    });
    submissionMap.set(
      `${submissionData.userEmail}-${submissionData.assignmentTitle}`,
      submission,
    );
    console.log(
      `✅ Created/updated submission for: ${assignment.title} by ${user.name}`,
    );
  }

  // Create feedback
  for (const feedbackData of DEFAULT_FEEDBACK) {
    const submission = submissionMap.get(
      `${feedbackData.submissionUser}-${feedbackData.assignmentTitle}`,
    );
    const author = users.get(feedbackData.authorEmail);
    const recipient = users.get(feedbackData.submissionUser);
    const { submissionUser, assignmentTitle, authorEmail, ...feedbackInfo } =
      feedbackData;

    await prisma.feedback.create({
      data: {
        ...feedbackInfo,
        submissionId: submission.id,
        authorId: author.id,
        recipientId: recipient.id,
      },
    });
    console.log(`✅ Created feedback for submission by ${recipient.name}`);
  }

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
