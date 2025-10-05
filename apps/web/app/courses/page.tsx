import { Suspense } from 'react';
import styles from './page.module.css';
import CoursesClient from './CoursesClient';

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

export default function CoursesPage() {
  return (
    <div className={styles.coursesContainer}>
      <h1 className={styles.pageTitle}>Available Courses</h1>
      <Suspense fallback={<CoursesLoadingFallback />}>
        <CoursesClient />
      </Suspense>
    </div>
  );
}
