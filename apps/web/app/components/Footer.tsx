import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>&copy; {new Date().getFullYear()} CISC474 Project.</div>
    </footer>
  );
}
