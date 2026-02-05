import styles from './SubmitButton.module.css';

const SubmitButton = ({ onClick, disabled, hasGuess }) => {
  return (
    <button
      className={`${styles.button} ${hasGuess ? styles.active : ''}`}
      onClick={onClick}
      disabled={disabled || !hasGuess}
    >
      {hasGuess ? 'Submit Guess' : 'Place your guess on the map'}
    </button>
  );
};

export default SubmitButton;
