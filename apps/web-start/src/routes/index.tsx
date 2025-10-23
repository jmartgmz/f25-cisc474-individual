import { createFileRoute } from '@tanstack/react-router';
import LoginButton from '../components/LoginButton';
import styles from './index.module.css';

function Home() {
  return (
    <div className={styles.dashboard}>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <LoginButton />
      </div>
      <div className={styles.coursesSection}>
        <div className={styles.courseBox}>
          <div className={styles.courseTitle}>COURSE 1</div>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: '75%' }} />
          </div>
          <div className={styles.progressLabel}>Progress: 75%</div>
        </div>
        <div className={styles.courseBox}>
          <div className={styles.courseTitle}>COURSE 2</div>
          <div className={styles.notEnrolled}>Not Enrolled</div>
        </div>
        <div className={styles.courseBox}>
          <div className={styles.courseTitle}>COURSE 3</div>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: '45%' }} />
          </div>
          <div className={styles.progressLabel}>Progress: 45%</div>
          <div className={styles.nextAssignment}>Next: Assignment 3</div>
        </div>
        <div className={styles.courseBox}>
          <div className={styles.courseTitle}>COURSE 4</div>
          <div className={styles.comingSoon}>Coming Soon</div>
        </div>
      </div>
      <div className={styles.feedbackSection}>
        <div className={styles.sectionTitle}>FEEDBACK</div>
        <ul className={styles.feedbackList}>
          <li>☑ Feedback item 1</li>
          <li>☑ Feedback item 2</li>
          <li>☒ Feedback item 3</li>
          <li>☑ Feedback item 4</li>
          <li>☒ Feedback item 5</li>
          <li>☒ Feedback item 6</li>
        </ul>
      </div>
      <div className={styles.dueSection}>
        <div className={styles.sectionTitle}>DUE THIS WEEK</div>
        <table className={styles.calendar}>
          <thead>
            <tr>
              <th>SUN</th>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th>SAT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <tr>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
            </tr>
            <tr>
              <td>22</td>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Home,
});
