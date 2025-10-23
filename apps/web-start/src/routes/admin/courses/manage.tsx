import { Link, createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useApiMutation, useApiQuery } from '../../../integrations/api';
import styles from '../../admin.module.css';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  code: string;
  semester: string;
  instructorId: string;
  isActive: boolean;
  instructor?: {
    id: string;
    name: string | null;
    email: string;
  };
  enrollments?: Array<{ id: string }>;
}

interface CourseCreateIn {
  title: string;
  description?: string | null;
  code: string;
  semester: string;
  instructorId: string;
  isActive?: boolean;
}

interface CourseUpdateIn {
  id: string;
  title?: string;
  description?: string | null;
  code?: string;
  semester?: string;
  instructorId?: string;
  isActive?: boolean;
}

interface CourseDeleteIn {
  id: string;
}

function CreateCourseForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [semester, setSemester] = useState('');
  const [instructorId, setInstructorId] = useState('');

  const { data: users } = useApiQuery<Array<User>>(['manage-users'], '/users');

  const instructors = users?.filter((user) => user.role === 'INSTRUCTOR') || [];

  const createMutation = useApiMutation({
    path: '/courses/create',
    method: 'POST',
    invalidateKeys: [['courses'], ['admin-courses']],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code || !semester || !instructorId) {
      alert('Please fill in all required fields');
      return;
    }

    createMutation.mutate({
      title,
      description: description || null,
      code,
      semester,
      instructorId,
      isActive: true,
    } as any);
  };

  return (
    <div className={styles.adminCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Create New Course</div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <label style={{ fontWeight: 'bold' }}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course Title"
            required
            style={{ padding: '0.5rem', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              flex: 1,
            }}
          >
            <label style={{ fontWeight: 'bold' }}>Code *</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="CISC474"
              required
              style={{ padding: '0.5rem', border: '1px solid #ddd' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              flex: 1,
            }}
          >
            <label style={{ fontWeight: 'bold' }}>Semester *</label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="Fall 2025"
              required
              style={{ padding: '0.5rem', border: '1px solid #ddd' }}
            />
          </div>
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <label style={{ fontWeight: 'bold' }}>Instructor *</label>
          <select
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value)}
            required
            style={{ padding: '0.5rem', border: '1px solid #ddd' }}
          >
            <option value="">Select an instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name || instructor.email}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <label style={{ fontWeight: 'bold' }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course description"
            rows={3}
            style={{
              padding: '0.5rem',
              border: '1px solid #ddd',
              resize: 'vertical',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className={styles.createButton}
          style={{ alignSelf: 'flex-start' }}
        >
          {createMutation.isPending ? 'Creating...' : 'Create Course'}
        </button>

        {createMutation.isError && (
          <div style={{ color: 'red', fontSize: '0.9rem' }}>
            Error:{' '}
            {createMutation.error instanceof Error
              ? createMutation.error.message
              : 'Unknown error'}
          </div>
        )}

        {createMutation.isSuccess && (
          <div style={{ color: 'green', fontSize: '0.9rem' }}>
            Course created successfully!
          </div>
        )}
      </form>
    </div>
  );
}

function EditCourseForm() {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [semester, setSemester] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [isActive, setIsActive] = useState(true);

  const { data: courses } = useApiQuery<Array<Course>>(['manage-courses'], '/courses');

  const { data: users } = useApiQuery<Array<User>>(['manage-users'], '/users');

  const instructors = users?.filter((user) => user.role === 'INSTRUCTOR') || [];

  const updateMutation = useApiMutation({
    path: '/courses/update',
    method: 'PATCH',
    invalidateKeys: [['courses'], ['admin-courses'], ['manage-courses']],
  });

  const handleCourseSelect = (courseId: string) => {
    const course = courses?.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourseId(courseId);
      setTitle(course.title);
      setDescription(course.description || '');
      setCode(course.code);
      setSemester(course.semester);
      setInstructorId(course.instructorId);
      setIsActive(course.isActive);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) {
      alert('Please select a course to edit');
      return;
    }

    updateMutation.mutate({
      id: selectedCourseId,
      title,
      description: description || null,
      code,
      semester,
      instructorId,
      isActive,
    } as any);
  };

  return (
    <div className={styles.adminCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Edit Course</div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          Select Course *
        </label>
        <select
          value={selectedCourseId}
          onChange={(e) => handleCourseSelect(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ddd', width: '100%' }}
        >
          <option value="">Select a course to edit</option>
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.code} - {course.title}
            </option>
          ))}
        </select>
      </div>

      {selectedCourseId && (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label style={{ fontWeight: 'bold' }}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ padding: '0.5rem', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                flex: 1,
              }}
            >
              <label style={{ fontWeight: 'bold' }}>Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                style={{ padding: '0.5rem', border: '1px solid #ddd' }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                flex: 1,
              }}
            >
              <label style={{ fontWeight: 'bold' }}>Semester *</label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
                style={{ padding: '0.5rem', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label style={{ fontWeight: 'bold' }}>Instructor *</label>
            <select
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
              required
              style={{ padding: '0.5rem', border: '1px solid #ddd' }}
            >
              <option value="">Select an instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name || instructor.email}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label style={{ fontWeight: 'bold' }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                padding: '0.5rem',
                border: '1px solid #ddd',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              id="isActive"
            />
            <label htmlFor="isActive" style={{ fontWeight: 'bold' }}>
              Active Course
            </label>
          </div>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className={styles.createButton}
            style={{ alignSelf: 'flex-start' }}
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Course'}
          </button>

          {updateMutation.isError && (
            <div style={{ color: 'red', fontSize: '0.9rem' }}>
              Error:{' '}
              {updateMutation.error instanceof Error
                ? updateMutation.error.message
                : 'Unknown error'}
            </div>
          )}

          {updateMutation.isSuccess && (
            <div style={{ color: 'green', fontSize: '0.9rem' }}>
              Course updated successfully!
            </div>
          )}
        </form>
      )}
    </div>
  );
}

function DeleteCourseForm() {
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const { data: courses } = useApiQuery<Array<Course>>(['manage-courses'], '/courses');

  const deleteMutation = useApiMutation({
    path: '/courses/delete',
    method: 'DELETE',
    invalidateKeys: [['courses'], ['admin-courses'], ['manage-courses']],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) {
      alert('Please select a course to delete');
      return;
    }

    const course = courses?.find((c) => c.id === selectedCourseId);
    if (
      course &&
      confirm(
        `Are you sure you want to delete "${course.title}"? This action cannot be undone.`,
      )
    ) {
      deleteMutation.mutate({ id: selectedCourseId } as any);
    }
  };

  const selectedCourse = courses?.find((c) => c.id === selectedCourseId);

  return (
    <div className={styles.adminCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Delete Course</div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <label style={{ fontWeight: 'bold' }}>
            Select Course to Delete *
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ddd' }}
          >
            <option value="">Select a course to delete</option>
            {courses?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div
            style={{
              padding: '1rem',
              border: '1px solid #ddd',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
              Course Details:
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                fontSize: '0.9rem',
              }}
            >
              <div>
                <strong>Title:</strong> {selectedCourse.title}
              </div>
              <div>
                <strong>Code:</strong> {selectedCourse.code}
              </div>
              <div>
                <strong>Semester:</strong> {selectedCourse.semester}
              </div>
              <div>
                <strong>Instructor:</strong>{' '}
                {selectedCourse.instructor?.name ||
                  selectedCourse.instructor?.email}
              </div>
              <div>
                <strong>Students Enrolled:</strong>{' '}
                {selectedCourse.enrollments?.length || 0}
              </div>
              <div>
                <strong>Status:</strong>{' '}
                {selectedCourse.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                backgroundColor: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '4px',
                fontSize: '0.9rem',
              }}
            >
              ⚠️ <strong>Warning:</strong> This action cannot be undone!
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedCourseId || deleteMutation.isPending}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            cursor:
              selectedCourseId && !deleteMutation.isPending
                ? 'pointer'
                : 'not-allowed',
            opacity: selectedCourseId && !deleteMutation.isPending ? 1 : 0.6,
            alignSelf: 'flex-start',
          }}
        >
          {deleteMutation.isPending ? 'Deleting...' : 'Delete Course'}
        </button>

        {deleteMutation.isError && (
          <div style={{ color: 'red', fontSize: '0.9rem' }}>
            Error:{' '}
            {deleteMutation.error instanceof Error
              ? deleteMutation.error.message
              : 'Unknown error'}
          </div>
        )}

        {deleteMutation.isSuccess && (
          <div style={{ color: 'green', fontSize: '0.9rem' }}>
            Course deleted successfully!
          </div>
        )}
      </form>
    </div>
  );
}

function ManageCoursesPage() {
  return (
    <div
      className={styles.adminSection}
      style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '2px solid #222',
      }}
    >
      <h2 className={styles.sectionTitle}>COURSE ADMINISTRATION</h2>

      <div className={styles.adminDashboard}>
        <CreateCourseForm />
        <EditCourseForm />
        <DeleteCourseForm />
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/admin" className={styles.actionButton}>
          ← Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/admin/courses/manage')({
  component: ManageCoursesPage,
});
