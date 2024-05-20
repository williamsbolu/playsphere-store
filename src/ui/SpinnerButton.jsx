import styles from './SpinnerButton.module.css';

function SpinnerButton({ type = 'light', size = 'small' }) {
  return (
    <div className={`${styles.spinner} ${styles[type]} ${styles[size]}`}></div>
  );
}

export default SpinnerButton;
