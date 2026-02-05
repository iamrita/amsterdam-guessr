import { useState, useCallback } from 'react';
import useGoogleMaps from './hooks/useGoogleMaps';
import StreetViewPanel from './components/StreetViewPanel';
import GuessMap from './components/GuessMap';
import SubmitButton from './components/SubmitButton';
import ResultOverlay from './components/ResultOverlay';
import { getRandomLocation } from './data/locations';
import { calculateDistance, calculateScore } from './utils/distance';
import styles from './App.module.css';

const GAME_STATES = {
  PLAYING: 'playing',
  RESULT: 'result',
};

function App() {
  const { isLoaded, loadError } = useGoogleMaps();
  const [gameState, setGameState] = useState(GAME_STATES.PLAYING);
  const [currentLocation, setCurrentLocation] = useState(getRandomLocation);
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState(null);

  const handleGuess = useCallback((position) => {
    setGuess(position);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!guess || !currentLocation) return;

    const distance = calculateDistance(
      currentLocation.lat,
      currentLocation.lng,
      guess.lat,
      guess.lng
    );
    const score = calculateScore(distance);

    setResult({
      actualLocation: { lat: currentLocation.lat, lng: currentLocation.lng },
      guessLocation: guess,
      distance,
      score,
    });
    setGameState(GAME_STATES.RESULT);
  }, [guess, currentLocation]);

  const handlePlayAgain = useCallback(() => {
    setCurrentLocation(getRandomLocation());
    setGuess(null);
    setResult(null);
    setGameState(GAME_STATES.PLAYING);
  }, []);

  if (loadError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          <h2>Failed to load Google Maps</h2>
          <p>Please check your API key and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <main className={styles.gameContainer}>
        <StreetViewPanel location={currentLocation} isLoaded={isLoaded} />

        <GuessMap
          isLoaded={isLoaded}
          onGuess={handleGuess}
          guess={guess}
          disabled={gameState === GAME_STATES.RESULT}
        />

        <SubmitButton
          onClick={handleSubmit}
          disabled={gameState === GAME_STATES.RESULT}
          hasGuess={!!guess}
        />
      </main>

      {gameState === GAME_STATES.RESULT && result && (
        <ResultOverlay
          isLoaded={isLoaded}
          actualLocation={result.actualLocation}
          guessLocation={result.guessLocation}
          distance={result.distance}
          score={result.score}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;
