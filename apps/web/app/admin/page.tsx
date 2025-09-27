import styles from './page.module.css';

export default function AdminPage() {
  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.pageTitle}>Admin Dashboard</h1>

      <div className={styles.adminDashboard}>
        <div className={styles.adminSection}>
          <h2 className={styles.sectionTitle}>USERS MANAGEMENT</h2>

          <div className={styles.adminCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Users</div>
              <div className={styles.cardActions}>
                <div className={styles.actionButton}>Manage</div>
              </div>
            </div>

            <div className={styles.createButton}>Create User</div>

            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>John Doe</td>
                  <td>Student</td>
                  <td>Active</td>
                  <td>Edit / Delete</td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>Jane Smith</td>
                  <td>Instructor</td>
                  <td>Active</td>
                  <td>Edit / Delete</td>
                </tr>
                <tr>
                  <td>003</td>
                  <td>Mark Johnson</td>
                  <td>Admin</td>
                  <td>Active</td>
                  <td>Edit / Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.adminSection}>
          <h2 className={styles.sectionTitle}>COURSES MANAGEMENT</h2>

          <div className={styles.adminCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Courses</div>
              <div className={styles.cardActions}>
                <div className={styles.actionButton}>Manage</div>
              </div>
            </div>

            <div className={styles.createButton}>Create Course</div>

            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Instructor</th>
                  <th>Students</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>C001</td>
                  <td>Intro to Programming</td>
                  <td>Dr. Smith</td>
                  <td>32</td>
                  <td>Active</td>
                  <td>Edit / Delete</td>
                </tr>
                <tr>
                  <td>C002</td>
                  <td>Web Development</td>
                  <td>Dr. Johnson</td>
                  <td>28</td>
                  <td>Active</td>
                  <td>Edit / Delete</td>
                </tr>
                <tr>
                  <td>C003</td>
                  <td>Data Structures</td>
                  <td>Dr. Williams</td>
                  <td>25</td>
                  <td>Active</td>
                  <td>Edit / Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
