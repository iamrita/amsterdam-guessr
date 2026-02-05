import { useEffect, useRef, useState } from 'react';
import styles from './StreetViewPanel.module.css';

const StreetViewPanel = ({ location, isLoaded }) => {
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!isLoaded || !location || !streetViewRef.current) return;

    setStatus('loading');
    let timeoutId;
    let hasLoaded = false;

    // Timeout to show error if Street View doesn't load
    timeoutId = setTimeout(() => {
      if (!hasLoaded) {
        setStatus('error');
      }
    }, 8000);

    // Directly create panorama
    try {
      panoramaRef.current = new window.google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position: { lat: location.lat, lng: location.lng },
          pov: {
            heading: Math.random() * 360,
            pitch: 0,
          },
          zoom: 1,
          addressControl: false,
          showRoadLabels: false,
          enableCloseButton: false,
          fullscreenControl: false,
          motionTracking: false,
          motionTrackingControl: false,
          linksControl: true,
          panControl: true,
          zoomControl: true,
        }
      );

      // Listen for status changes
      panoramaRef.current.addListener('status_changed', () => {
        const panoStatus = panoramaRef.current.getStatus();
        if (panoStatus === 'OK') {
          hasLoaded = true;
          clearTimeout(timeoutId);
          setStatus('ready');
        } else {
          clearTimeout(timeoutId);
          setStatus('error');
        }
      });

      // Check status after a short delay
      setTimeout(() => {
        if (panoramaRef.current) {
          const panoStatus = panoramaRef.current.getStatus();
          if (panoStatus === 'OK') {
            hasLoaded = true;
            clearTimeout(timeoutId);
            setStatus('ready');
          }
        }
      }, 2000);

    } catch (error) {
      console.error('Error creating Street View:', error);
      clearTimeout(timeoutId);
      setStatus('error');
    }

    return () => {
      clearTimeout(timeoutId);
      if (panoramaRef.current) {
        window.google.maps.event.clearInstanceListeners(panoramaRef.current);
        panoramaRef.current = null;
      }
    };
  }, [isLoaded, location]);

  return (
    <div className={styles.container}>
      <div ref={streetViewRef} className={styles.streetView}>
        {status === 'loading' && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
            <p>Loading Street View...</p>
          </div>
        )}
        {status === 'error' && (
          <div className={styles.errorOverlay}>
            <div className={styles.errorIcon}>!</div>
            <p className={styles.errorText}>Error loading Street View</p>
            <button 
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
      {status === 'ready' && (
        <div className={styles.overlay}>
          <span className={styles.hint}>Where in Amsterdam are you?</span>
        </div>
      )}
    </div>
  );
};

export default StreetViewPanel;
