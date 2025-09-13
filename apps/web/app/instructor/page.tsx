import styles from "./page.module.css";

export default function InstructorPage() {
  return (
    <div className={styles.instructorContainer}>
      <h1 className={styles.pageTitle}>Instructor Dashboard</h1>
      
      <div className={styles.instructorDashboard}>
        <div className={styles.coursesSection}>
          <div className={styles.courseCard}>
            <div className={styles.courseHeader}>
              <div className={styles.courseTitle}>COURSE 1: Introduction to Programming</div>
              <div className={styles.courseActions}>
                <div className={styles.actionButton}>Edit</div>
                <div className={styles.actionButton}>Manage</div>
              </div>
            </div>
            <div className={styles.studentsCount}>Students: 32</div>
            <div className={styles.progressInfo}>
              <span>Average Progress: 75%</span>
              <span>Average Grade: 83%</span>
            </div>
            <div className={styles.progressInfo}>
              <span>Assignments Due: 2</span>
              <span>To Grade: 15</span>
            </div>
          </div>
          
          <div className={styles.courseCard}>
            <div className={styles.courseHeader}>
              <div className={styles.courseTitle}>COURSE 3: Data Structures</div>
              <div className={styles.courseActions}>
                <div className={styles.actionButton}>Edit</div>
                <div className={styles.actionButton}>Manage</div>
              </div>
            </div>
            <div className={styles.studentsCount}>Students: 28</div>
            <div className={styles.progressInfo}>
              <span>Average Progress: 62%</span>
              <span>Average Grade: 78%</span>
            </div>
            <div className={styles.progressInfo}>
              <span>Assignments Due: 1</span>
              <span>To Grade: 8</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statTitle}>RECENT ACTIVITY</div>
            <div className={styles.statItem}>
              <span>Assignments Submitted</span>
              <span>12</span>
            </div>
            <div className={styles.statItem}>
              <span>Questions Asked</span>
              <span>8</span>
            </div>
            <div className={styles.statItem}>
              <span>Discussions Created</span>
              <span>3</span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statTitle}>STUDENT STATS</div>
            <div className={styles.statItem}>
              <span>Total Students</span>
              <span>60</span>
            </div>
            <div className={styles.statItem}>
              <span>Active Students</span>
              <span>54</span>
            </div>
            <div className={styles.statItem}>
              <span>At Risk Students</span>
              <span>7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}