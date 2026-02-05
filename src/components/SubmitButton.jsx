import styles from './SubmitButton.module.css';

const SubmitButton = ({ onClick, disabled, hasGuess, onRegenerate }) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.regenerateButton}
        onClick={onRegenerate}
        disabled={disabled}
        title="Get a new location"
      >
        <span className={styles.regenerateIcon}>↻</span>
      </button>
      <button
        className={`${styles.button} ${hasGuess ? styles.active : ''}`}
        onClick={onClick}
        disabled={disabled || !hasGuess}
      >
        {hasGuess ? 'Submit Guess' : 'Place your guess on the map'}
      </button>
    </div>
  );
};

export default SubmitButton;
