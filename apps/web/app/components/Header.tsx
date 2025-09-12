import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/courses">User</Link>
          </li>
          <li>
            <Link href="/instructors">Home</Link>
          </li>
          <li>
            <Link href="/admin">Courses</Link>
          </li>
          <li>
            <Link href="/admin">Admin Dash</Link>
          </li>
          <li>
            <Link href="/admin">Instructor Dash</Link>
          </li>
          <li>
            <Link href="/admin">Help</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
