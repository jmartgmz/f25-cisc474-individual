'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Instructor {
  id: string;
  name: string | null;
  email: string;
  role: string;
  coursesAsInstructor: {
    id: string;
    title: string;
    code: string;
    semester: string;
    isActive: boolean;
  }[];
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

export default function InstructorsClient() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
        console.log('API URL being used:', apiUrl);
        console.log('Environment variables:', {
          NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
          NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
        });
        
        const response = await fetch(`${apiUrl}/users/instructors`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch instructors: ${response.status}`);
        }
        
        const data = await response.json();
        setInstructors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch instructors');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) return <InstructorsLoadingSkeleton />;
  
  if (error) {
    return (
      <div className={styles.instructorsGrid}>
        <div className={styles.instructorCard}>
          <div className={styles.instructorName}>Error Loading Instructors</div>
          <div className={styles.instructorInfo}>{error}</div>
        </div>
      </div>
    );
  }

  if (instructors.length === 0) {
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
      {instructors.map((instructor) => (
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
          <div className={styles.instructorInfo}>
            Courses Teaching: {instructor.coursesAsInstructor.length}
          </div>
          {instructor.coursesAsInstructor.length > 0 && (
            <div className={styles.coursesList}>
              <div className={styles.coursesTitle}>Courses:</div>
              {instructor.coursesAsInstructor.map((course) => (
                <div key={course.id} className={styles.courseItem}>
                  <span className={styles.courseCode}>{course.code}</span>
                  <span className={styles.courseTitle}>{course.title}</span>
                  <span className={styles.courseSemester}>({course.semester})</span>
                  <span className={styles.courseStatus}>
                    {course.isActive ? '✓ Active' : '✗ Inactive'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}