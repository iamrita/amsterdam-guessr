import { useEffect, useRef } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { formatDistance } from '../utils/distance';
import { AMSTERDAM_CENTER } from '../data/locations';
import styles from './ResultOverlay.module.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#c5d8f0' }],
    },
    {
      featureType: 'landscape',
      stylers: [{ color: '#f5f5f0' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#e0e0e0' }],
    },
    {
      featureType: 'landscape.man_made',
      stylers: [{ color: '#eaeae5' }],
    },
  ],
};

const ResultOverlay = ({
  isLoaded,
  actualLocation,
  guessLocation,
  distance,
  score,
  onPlayAgain,
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && actualLocation && guessLocation) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(actualLocation);
      bounds.extend(guessLocation);
      mapRef.current.fitBounds(bounds, { padding: 80 });
    }
  }, [actualLocation, guessLocation]);

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const getScoreColor = () => {
    if (score >= 4500) return '#2845D6'; // Blue - great
    if (score >= 3000) return '#1A2CA3'; // Medium blue
    if (score >= 1500) return '#F68048'; // Orange
    return '#0D1A63'; // Dark navy
  };

  const getScoreMessage = () => {
    if (score >= 4500) return 'Amazing!';
    if (score >= 3500) return 'Great job!';
    if (score >= 2000) return 'Good guess!';
    if (score >= 1000) return 'Not bad!';
    return 'Keep exploring!';
  };

  if (!isLoaded) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.mapSection}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={AMSTERDAM_CENTER}
            zoom={13}
            options={mapOptions}
            onLoad={onMapLoad}
          >
            {/* Actual Location Marker */}
            <Marker
              position={actualLocation}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#2845D6',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3,
              }}
            />
            {/* Guess Location Marker */}
            <Marker
              position={guessLocation}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#F68048',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3,
              }}
            />
            {/* Line connecting both */}
            <Polyline
              path={[actualLocation, guessLocation]}
              options={{
                strokeColor: '#333333',
                strokeOpacity: 0.7,
                strokeWeight: 3,
                geodesic: true,
              }}
            />
          </GoogleMap>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.message} style={{ color: getScoreColor() }}>
            {getScoreMessage()}
          </div>

          <div className={styles.scoreContainer}>
            <div className={styles.scoreLabel}>Score</div>
            <div className={styles.score} style={{ color: getScoreColor() }}>
              {score.toLocaleString()}
            </div>
            <div className={styles.scoreMax}>/ 5,000</div>
          </div>

          <div className={styles.distanceContainer}>
            <div className={styles.distanceLabel}>Distance</div>
            <div className={styles.distance}>{formatDistance(distance)}</div>
          </div>

          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: '#2845D6' }}
              ></span>
              <span>Actual Location</span>
            </div>
            <div className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: '#F68048' }}
              ></span>
              <span>Your Guess</span>
            </div>
          </div>

          <button className={styles.playAgainButton} onClick={onPlayAgain}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultOverlay;
