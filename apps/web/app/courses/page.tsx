import styles from "./page.module.css";

export default function CoursesPage() {
  return (
    <div className={styles.coursesContainer}>
      <h1 className={styles.pageTitle}>Available Courses</h1>
      <div className={styles.coursesGrid}>
        <div className={styles.courseCard}>
          <div className={styles.courseTitle}>COURSE 1</div>
          <div className={styles.courseInfo}>Instructor: Dr. Smith</div>
          <div className={styles.courseInfo}>Credits: 3</div>
          <div className={styles.courseInfo}>Status: Open</div>
          <div className={styles.enrollButton}>Enroll</div>
        </div>
        <div className={styles.courseCard}>
          <div className={styles.courseTitle}>COURSE 2</div>
          <div className={styles.courseInfo}>Instructor: Dr. Johnson</div>
          <div className={styles.courseInfo}>Credits: 4</div>
          <div className={styles.courseInfo}>Status: Open</div>
          <div className={styles.enrollButton}>Enroll</div>
        </div>
        <div className={styles.courseCard}>
          <div className={styles.courseTitle}>COURSE 3</div>
          <div className={styles.courseInfo}>Instructor: Dr. Williams</div>
          <div className={styles.courseInfo}>Credits: 3</div>
          <div className={styles.courseInfo}>Status: Open</div>
          <div className={styles.enrollButton}>Enroll</div>
        </div>
        <div className={styles.courseCard}>
          <div className={styles.courseTitle}>COURSE 4</div>
          <div className={styles.courseInfo}>Instructor: Dr. Brown</div>
          <div className={styles.courseInfo}>Credits: 3</div>
          <div className={styles.courseInfo}>Status: Coming Soon</div>
        </div>
      </div>
    </div>
  );
}