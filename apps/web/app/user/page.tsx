import styles from './page.module.css';

export default function UserPage() {
  return (
    <div className={styles.userContainer}>
      <h1 className={styles.pageTitle}>User Profile</h1>

      <div className={styles.profileSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}></div>
          <div className={styles.userName}>John Doe</div>
          <div className={styles.userDetail}>Email: john.doe@example.com</div>
          <div className={styles.userDetail}>ID: 12345678</div>
          <div className={styles.userDetail}>Program: Computer Science</div>
          <div className={styles.userDetail}>Year: 3</div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>3</div>
            <div className={styles.statLabel}>Active Courses</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>75%</div>
            <div className={styles.statLabel}>Avg. Completion</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>4</div>
            <div className={styles.statLabel}>Completed Courses</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>85%</div>
            <div className={styles.statLabel}>Avg. Grade</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>2</div>
            <div className={styles.statLabel}>Assignments Due</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>12</div>
            <div className={styles.statLabel}>Assignments Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
