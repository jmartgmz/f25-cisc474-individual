import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/user">User Profile</Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/courses">Courses</Link>
          </li>
          <li>
            <Link href="/instructor">Instructor</Link>
          </li>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
