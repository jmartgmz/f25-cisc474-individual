import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { backendFetcher } from '../integrations/fetcher';
import styles from './admin.module.css';

interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: string | null;
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
  createdAt: string;
  updatedAt: string;
  enrollments?: Array<{ id: string }>;
  coursesAsInstructor?: Array<{ id: string }>;
}

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

function UsersManagement() {
  const {
    data: users,
    isLoading: loading,
    error,
  } = useQuery<Array<User>>({
    queryKey: ['users'],
    queryFn: backendFetcher<Array<User>>('/users'),
  });

  if (loading) {
    return (
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Courses</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7}>Loading users...</td>
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
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Courses</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7}>
              Error loading users:{' '}
              {error instanceof Error ? error.message : 'Unknown error'}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (!users || users.length === 0) {
    return (
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Courses</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7}>No users found</td>
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
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Courses</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id.substring(0, 8)}...</td>
            <td>{user.name || 'No name'}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              {user.role === 'INSTRUCTOR'
                ? `${user.coursesAsInstructor?.length || 0} teaching`
                : user.role === 'STUDENT'
                  ? `${user.enrollments?.length || 0} enrolled`
                  : 'N/A'}
            </td>
            <td>{user.emailVerified ? 'Verified' : 'Unverified'}</td>
            <td>Edit / Delete</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CoursesManagement() {
  const {
    data: courses,
    isLoading: loading,
    error,
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
            <td colSpan={7}>
              Error loading courses:{' '}
              {error instanceof Error ? error.message : 'Unknown error'}
            </td>
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

            <Suspense
              fallback={
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Courses</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7}>Loading users...</td>
                    </tr>
                  </tbody>
                </table>
              }
            >
              <UsersManagement />
            </Suspense>
          </div>
        </div>

        <div className={styles.adminSection}>
          <h2 className={styles.sectionTitle}>COURSES MANAGEMENT</h2>

          <div className={styles.adminCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Courses</div>
              <div className={styles.cardActions}>
                <ManageButton />
              </div>
            </div>
            <Suspense
              fallback={
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
              }
            >
              <CoursesManagement />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Outlet for child routes */}
      <Outlet />
    </div>
  );
}

function ManageButton() {
  const location = useLocation();
  const isOpen = location.pathname.includes('/admin/courses/manage');
  const to = isOpen ? '/admin' : '/admin/courses/manage';
  const label = isOpen ? 'Close' : 'Manage';
  const chevron = isOpen ? '▲' : '▼';

  return (
    <Link
      to={to}
      className={styles.actionButton}
      title={
        isOpen
          ? 'Close course administration panel'
          : 'Open course administration panel'
      }
    >
      {label}{' '}
      <span style={{ transition: 'transform 150ms ease' }}>{chevron}</span>
    </Link>
  );
}

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});
