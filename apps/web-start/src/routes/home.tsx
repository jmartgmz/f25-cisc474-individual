import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';

export const Route = createFileRoute('/home')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div style={{ padding: '20px' }}>
        <h1>Welcome to the Learning Management System</h1>
        <div style={{ marginBottom: '20px' }}>
          <h2>User Information:</h2>
          <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/courses" style={{ marginRight: '10px', padding: '10px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            View Courses
          </Link>
          <LogoutButton />
        </div>
      </div>
    )
  );
}
