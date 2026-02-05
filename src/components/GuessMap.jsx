import { useState, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { AMSTERDAM_CENTER, AMSTERDAM_BOUNDS } from '../data/locations';
import styles from './GuessMap.module.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  clickableIcons: false,
  restriction: {
    latLngBounds: AMSTERDAM_BOUNDS,
    strictBounds: false,
  },
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
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [{ visibility: 'simplified' }],
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
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#666666' }],
    },
  ],
};

const GuessMap = ({ isLoaded, onGuess, guess, disabled }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMapClick = useCallback(
    (e) => {
      if (disabled) return;
      onGuess({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    },
    [onGuess, disabled]
  );

  if (!isLoaded) return null;

  return (
    <div
      className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={styles.mapWrapper}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={AMSTERDAM_CENTER}
          zoom={12}
          options={mapOptions}
          onClick={handleMapClick}
        >
          {guess && (
            <Marker
              position={guess}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#F68048',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3,
              }}
            />
          )}
        </GoogleMap>
      </div>
      <div className={styles.instructions}>
        {guess ? 'Click to move your guess' : 'Click on the map to guess'}
      </div>
    </div>
  );
};

export default GuessMap;
