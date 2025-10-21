import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { backendFetcher } from '../integrations/fetcher';
import styles from './courses.module.css';

interface Course {
  id: string;
  title: string;
  description: string | null;
  code: string;
  semester: string;
  isActive: boolean;
  instructor: {
    id: string;
    name: string | null;
    email: string;
  };
  enrollments: Array<{ id: string }>;
}

function CoursesLoadingSkeleton() {
  return (
    <div className={styles.coursesGrid}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className={styles.courseCard}>
          <div className={styles.courseTitle}>Loading...</div>
          <div className={styles.courseInfo}>Instructor: Loading...</div>
          <div className={styles.courseInfo}>Code: Loading...</div>
          <div className={styles.courseInfo}>Status: Loading...</div>
        </div>
      ))}
    </div>
  );
}

function CoursesClient() {
  const {
    data: courses,
    isLoading: loading,
    error,
  } = useQuery<Array<Course>>({
    queryKey: ['courses'],
    queryFn: backendFetcher<Array<Course>>('/courses'),
  });

  if (loading) return <CoursesLoadingSkeleton />;

  if (error) {
    return (
      <div className={styles.coursesGrid}>
        <div className={styles.courseCard}>
          <div className={styles.courseTitle}>Error Loading Courses</div>
          <div className={styles.courseInfo}>
            {error instanceof Error ? error.message : 'Failed to fetch courses'}
          </div>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className={styles.coursesGrid}>
        <div className={styles.courseCard}>
          <div className={styles.courseTitle}>No Courses Found</div>
          <div className={styles.courseInfo}>
            No courses are currently available.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.coursesGrid}>
      {courses.map((course: Course) => (
        <div key={course.id} className={styles.courseCard}>
          <div className={styles.courseTitle}>{course.title}</div>
          <div className={styles.courseInfo}>
            Instructor: {course.instructor.name || course.instructor.email}
          </div>
          <div className={styles.courseInfo}>Code: {course.code}</div>
          <div className={styles.courseInfo}>Semester: {course.semester}</div>
          <div className={styles.courseInfo}>
            Enrollments: {course.enrollments.length}
          </div>
          <div className={styles.courseInfo}>
            Status: {course.isActive ? 'Active' : 'Inactive'}
          </div>
          {course.description && (
            <div className={styles.courseInfo}>
              Description: {course.description}
            </div>
          )}
          <div className={styles.enrollButton}>
            {course.isActive ? 'Enroll' : 'Coming Soon'}
          </div>
        </div>
      ))}
    </div>
  );
}

function CoursesLoadingFallback() {
  return (
    <div className={styles.coursesGrid}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className={styles.courseCard}>
          <div className={styles.courseTitle}>Loading...</div>
          <div className={styles.courseInfo}>Instructor: Loading...</div>
          <div className={styles.courseInfo}>Code: Loading...</div>
          <div className={styles.courseInfo}>Status: Loading...</div>
        </div>
      ))}
    </div>
  );
}

function CoursesPage() {
  return (
    <div className={styles.coursesContainer}>
      <h1 className={styles.pageTitle}>Available Courses</h1>
      <Suspense fallback={<CoursesLoadingFallback />}>
        <CoursesClient />
      </Suspense>
    </div>
  );
}

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
});
