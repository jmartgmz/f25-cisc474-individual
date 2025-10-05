'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

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
  enrollments: { id: string }[];
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

export default function CoursesClient() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${apiUrl}/courses`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.status}`);
        }
        
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <CoursesLoadingSkeleton />;
  
  if (error) {
    return (
      <div className={styles.coursesGrid}>
        <div className={styles.courseCard}>
          <div className={styles.courseTitle}>Error Loading Courses</div>
          <div className={styles.courseInfo}>{error}</div>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className={styles.coursesGrid}>
        <div className={styles.courseCard}>
          <div className={styles.courseTitle}>No Courses Found</div>
          <div className={styles.courseInfo}>No courses are currently available.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.coursesGrid}>
      {courses.map((course) => (
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