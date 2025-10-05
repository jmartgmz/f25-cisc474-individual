'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function DemoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Backend API Integration Demo</h1>
        <p className={styles.subtitle}>
          This demo showcases frontend data fetching from our backend API using React Suspense and proper CORS configuration.
        </p>
      </div>

      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Features Implemented:</h2>
        <div className={styles.featuresList}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✅</div>
            <div className={styles.featureText}>
              <strong>CORS Configuration:</strong> Properly configured backend with environment-specific CORS (no wildcards for production)
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✅</div>
            <div className={styles.featureText}>
              <strong>React Suspense:</strong> Loading fallbacks while data is being fetched from the API
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✅</div>
            <div className={styles.featureText}>
              <strong>Environment Variables:</strong> Secure configuration for frontend-backend communication
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✅</div>
            <div className={styles.featureText}>
              <strong>Two API Endpoints:</strong> Courses data and Instructors data fetching
            </div>
          </div>
        </div>
      </div>

      <div className={styles.testSection}>
        <h2 className={styles.sectionTitle}>Test the Implementation:</h2>
        <p className={styles.instructions}>
          Click the links below to see live data fetching from our backend API:
        </p>
        
        <div className={styles.linksContainer}>
          <Link href="/courses" className={styles.testLink}>
            <div className={styles.linkCard}>
              <h3 className={styles.linkTitle}>📚 View Courses</h3>
              <p className={styles.linkDescription}>
                Fetches course data with instructor information from <code>/api/courses</code>
              </p>
              <div className={styles.linkButton}>Test Courses API →</div>
            </div>
          </Link>

          <Link href="/instructor" className={styles.testLink}>
            <div className={styles.linkCard}>
              <h3 className={styles.linkTitle}>👨‍🏫 View Instructors</h3>
              <p className={styles.linkDescription}>
                Fetches instructor data with their courses from <code>/api/users/instructors</code>
              </p>
              <div className={styles.linkButton}>Test Instructors API →</div>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.technicalSection}>
        <h2 className={styles.sectionTitle}>Technical Details:</h2>
        <div className={styles.technicalGrid}>
          <div className={styles.techCard}>
            <h4>Backend</h4>
            <ul>
              <li>NestJS API with Prisma ORM</li>
              <li>CORS configured with specific origin</li>
              <li>PostgreSQL database</li>
              <li>Environment-based configuration</li>
            </ul>
          </div>
          <div className={styles.techCard}>
            <h4>Frontend</h4>
            <ul>
              <li>Next.js 14 with App Router</li>
              <li>React Suspense for async data</li>
              <li>Client components for interactivity</li>
              <li>Environment variables for API URL</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Link href="/" className={styles.backLink}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}