import { z } from 'zod';

// Reference DTOs (lightweight relation embeds)
export const CourseRef = z.object({
  id: z.string(),
  title: z.string(),
  code: z.string(),
});
export type CourseRef = z.infer<typeof CourseRef>;

// User reference for instructor
export const UserRef = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
});
export type UserRef = z.infer<typeof UserRef>;

// Output DTOs (API responses)
export const CourseOut = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  code: z.string(),
  semester: z.string(),
  instructorId: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  instructor: UserRef.optional(),
  enrollments: z.array(z.object({ id: z.string() })).optional(),
});
export type CourseOut = z.infer<typeof CourseOut>;

// Creation DTOs (API request bodies)
export const CourseCreateIn = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().nullable(),
  code: z.string().min(1, 'Course code is required'),
  semester: z.string().min(1, 'Semester is required'),
  instructorId: z.string().min(1, 'Instructor ID is required'),
  isActive: z.boolean().default(true),
});
export type CourseCreateIn = z.infer<typeof CourseCreateIn>;

// Update DTOs (API request bodies)
export const CourseUpdateIn = z.object({
  id: z.string().min(1, 'Course ID is required'),
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional().nullable(),
  code: z.string().min(1, 'Course code is required').optional(),
  semester: z.string().min(1, 'Semester is required').optional(),
  instructorId: z.string().min(1, 'Instructor ID is required').optional(),
  isActive: z.boolean().optional(),
});
export type CourseUpdateIn = z.infer<typeof CourseUpdateIn>;

// Delete DTOs (API request bodies)
export const CourseDeleteIn = z.object({
  id: z.string().min(1, 'Course ID is required'),
});
export type CourseDeleteIn = z.infer<typeof CourseDeleteIn>;