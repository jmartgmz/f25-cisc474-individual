import { createFileRoute } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { useCurrentUser } from '../integrations/api';
import LogoutButton from '../components/LogoutButton';
import styles from './user.module.css';

function UserPage() {
  const { user: auth0User, isAuthenticated, isLoading: auth0Loading } = useAuth0();
  
  // Fetch user data from backend - this verifies backend authentication
  const { 
    data: backendUser, 
    isAuthPending, 
    showLoading, 
    error 
  } = useCurrentUser();

  if (auth0Loading || showLoading) {
    return (
      <div className={styles.userContainer}>
        <h1 className={styles.pageTitle}>Loading...</h1>
        {isAuthPending && <p>Authenticating with server...</p>}
      </div>
    );
  }

  if (!isAuthenticated || !auth0User) {
    return (
      <div className={styles.userContainer}>
        <h1 className={styles.pageTitle}>User Profile</h1>
        <div className={styles.profileSection}>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.userContainer}>
        <h1 className={styles.pageTitle}>Error</h1>
        <div className={styles.profileSection}>
          <p>Failed to load user data from server: {error.message}</p>
          <p>You may not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className={styles.pageTitle}>User Profile</h1>
        <LogoutButton />
      </div>

      <div className={styles.profileSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {auth0User.picture ? (
              <img src={auth0User.picture} alt={auth0User.name || 'User'} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#ccc' }} />
            )}
          </div>
          <div className={styles.userName}>{auth0User.name || 'Anonymous User'}</div>
          <div className={styles.userDetail}>Email: {auth0User.email || 'N/A'}</div>
          <div className={styles.userDetail}>Database ID: {backendUser?.id || 'Loading...'}</div>
          <div className={styles.userDetail}>Auth0 ID: {auth0User.sub || 'N/A'}</div>
          {auth0User.nickname && <div className={styles.userDetail}>Nickname: {auth0User.nickname}</div>}
          {auth0User.email_verified !== undefined && (
            <div className={styles.userDetail}>
              Email Verified: {auth0User.email_verified ? '✓ Yes' : '✗ No'}
            </div>
          )}
          {backendUser && (
            <div className={styles.userDetail} style={{ marginTop: '10px', padding: '10px', background: '#e8f5e9', borderRadius: '4px' }}>
              ✓ Authenticated with backend server
            </div>
          )}
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

export const Route = createFileRoute('/user')({
  component: UserPage,
});
