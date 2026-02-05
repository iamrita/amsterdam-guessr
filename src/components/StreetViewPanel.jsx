import { useEffect, useRef, useState } from 'react';
import styles from './StreetViewPanel.module.css';

const StreetViewPanel = ({ location, isLoaded }) => {
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [retryKey, setRetryKey] = useState(0);

  // Create the panorama instance ONCE when Google Maps loads
  useEffect(() => {
    if (!isLoaded || !streetViewRef.current || panoramaRef.current) return;

    panoramaRef.current = new window.google.maps.StreetViewPanorama(
      streetViewRef.current,
      {
        pov: { heading: 0, pitch: 0 },
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

    return () => {
      if (panoramaRef.current) {
        window.google.maps.event.clearInstanceListeners(panoramaRef.current);
        panoramaRef.current = null;
      }
    };
  }, [isLoaded]);

  // Update position when location changes (reuse existing panorama)
  useEffect(() => {
    if (!isLoaded || !location || !panoramaRef.current) return;

    setStatus('loading');
    let timeoutId;
    let hasLoaded = false;
    let statusListener = null;

    // Timeout to show error if Street View doesn't load
    timeoutId = setTimeout(() => {
      if (!hasLoaded) {
        setStatus('error');
      }
    }, 8000);

    // Reuse existing panorama - just update position
    panoramaRef.current.setPosition({ lat: location.lat, lng: location.lng });
    panoramaRef.current.setPov({ heading: Math.random() * 360, pitch: 0 });

    // Listen for status changes
    statusListener = panoramaRef.current.addListener('status_changed', () => {
      const panoStatus = panoramaRef.current ? panoramaRef.current.getStatus() : 'NO_PANORAMA';
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

    return () => {
      clearTimeout(timeoutId);
      // Only remove the status listener, keep the panorama instance
      if (statusListener) {
        window.google.maps.event.removeListener(statusListener);
      }
    };
  }, [isLoaded, location, retryKey]);

  const handleRetry = () => {
    setRetryKey(prev => prev + 1);
  };

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
              onClick={handleRetry}
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
