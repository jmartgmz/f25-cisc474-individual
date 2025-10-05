import { Suspense } from 'react';
import styles from './page.module.css';
import InstructorsClient from './InstructorsClient';

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

export default function InstructorPage() {
  return (
    <div className={styles.instructorContainer}>
      <h1 className={styles.pageTitle}>Instructors</h1>
      <Suspense fallback={<InstructorsLoadingFallback />}>
        <InstructorsClient />
      </Suspense>
    </div>
  );
}
