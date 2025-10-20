import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { backendFetcher } from '../integrations/fetcher';
import styles from './admin.module.css';

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

function CoursesManagement() {
  const { 
    data: courses, 
    isLoading: loading, 
    error 
  } = useQuery<Array<Course>>({
    queryKey: ['courses'],
    queryFn: backendFetcher<Array<Course>>('/courses'),
  });

  if (loading) {
    return (
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Code</th>
            <th>Instructor</th>
            <th>Students</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7}>Loading courses...</td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (error) {
    return (
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Code</th>
            <th>Instructor</th>
            <th>Students</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7}>Error loading courses: {error instanceof Error ? error.message : 'Unknown error'}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Code</th>
            <th>Instructor</th>
            <th>Students</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7}>No courses found</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className={styles.dataTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Code</th>
          <th>Instructor</th>
          <th>Students</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td>{course.id.substring(0, 8)}...</td>
            <td>{course.title}</td>
            <td>{course.code}</td>
            <td>{course.instructor.name || course.instructor.email}</td>
            <td>{course.enrollments.length}</td>
            <td>{course.isActive ? 'Active' : 'Inactive'}</td>
            <td>Edit / Delete</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AdminPage() {
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

            <Suspense fallback={
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Code</th>
                    <th>Instructor</th>
                    <th>Students</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7}>Loading courses...</td>
                  </tr>
                </tbody>
              </table>
            }>
              <CoursesManagement />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});
