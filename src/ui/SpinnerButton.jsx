import styles from './SpinnerButton.module.css';

function SpinnerButton({ type }) {
  return (
    <div
      className={`${styles.spinner} ${type === 'white' ? styles['btn-white'] : styles['btn-dark']}`}
    ></div>
  );
}

export default SpinnerButton;
