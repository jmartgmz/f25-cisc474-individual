import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { backendFetcher } from '../integrations/fetcher'
import styles from './instructor.module.css'

interface Instructor {
  id: string;
  name: string | null;
  email: string;
  role: string;
  coursesAsInstructor: Array<{
    id: string;
    title: string;
    code: string;
    semester: string;
    isActive: boolean;
  }>;
}

function InstructorsLoadingSkeleton() {
  return (
    <div className={styles.instructorsGrid}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className={styles.instructorCard}>
          <div className={styles.instructorName}>Loading...</div>
          <div className={styles.instructorInfo}>Email: Loading...</div>
          <div className={styles.instructorInfo}>Courses: Loading...</div>
        </div>
      ))}
    </div>
  );
}

function InstructorsClient() {
  const { 
    data: instructors, 
    isLoading: loading, 
    error 
  } = useQuery<Array<Instructor>>({
    queryKey: ['instructors'],
    queryFn: backendFetcher<Array<Instructor>>('/users/instructors'),
  })

  if (loading) return <InstructorsLoadingSkeleton />;
  
  if (error) {
    return (
      <div className={styles.instructorsGrid}>
        <div className={styles.instructorCard}>
          <div className={styles.instructorName}>Error Loading Instructors</div>
          <div className={styles.instructorInfo}>{error instanceof Error ? error.message : 'Failed to fetch instructors'}</div>
        </div>
      </div>
    );
  }

  if (!instructors || instructors.length === 0) {
    return (
      <div className={styles.instructorsGrid}>
        <div className={styles.instructorCard}>
          <div className={styles.instructorName}>No Instructors Found</div>
          <div className={styles.instructorInfo}>No instructors are currently available.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.instructorsGrid}>
      {instructors.map((instructor: Instructor) => (
        <div key={instructor.id} className={styles.instructorCard}>
          <div className={styles.instructorName}>
            {instructor.name || 'Unnamed Instructor'}
          </div>
          <div className={styles.instructorInfo}>
            Email: {instructor.email}
          </div>
          <div className={styles.instructorInfo}>
            Role: {instructor.role}
          </div>
          {instructor.coursesAsInstructor.length > 0 && (
            <div className={styles.coursesSection}>
              <div className={styles.coursesTitle}>Courses Teaching:</div>
              <ul className={styles.coursesList}>
                {instructor.coursesAsInstructor.map((course) => (
                  <li key={course.id} className={styles.courseItem}>
                    {course.title} ({course.code}) - {course.semester}
                    {!course.isActive && <span className={styles.inactive}> (Inactive)</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function InstructorsLoadingFallback() {
  return (
    <div className={styles.instructorsGrid}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className={styles.instructorCard}>
          <div className={styles.instructorName}>Loading...</div>
          <div className={styles.instructorInfo}>Email: Loading...</div>
          <div className={styles.instructorInfo}>Courses: Loading...</div>
        </div>
      ))}
    </div>
  );
}

function InstructorPage() {
  return (
    <div className={styles.instructorContainer}>
      <h1 className={styles.pageTitle}>Instructors</h1>
      <Suspense fallback={<InstructorsLoadingFallback />}>
        <InstructorsClient />
      </Suspense>
    </div>
  );
}

export const Route = createFileRoute('/instructor')({
  component: InstructorPage,
})
