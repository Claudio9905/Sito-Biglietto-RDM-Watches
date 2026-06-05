import { useState, useEffect, useCallback } from 'react';

const COOKIE_CONSENT_KEY = 'rdm_cookie_consent';
const COOKIE_EXPIRY_MONTHS = 6;

// Struttura predefinita del consenso
const DEFAULT_CONSENT = {
  status: 'pending', // 'pending', 'accepted', 'rejected', 'custom'
  preferences: {
    necessary: true, // Sempre true
    functional: false,
    analytics: false,
    marketing: false,
  },
  timestamp: null,
};

export const useCookieConsent = () => {
  const [consent, setConsent] = useState(DEFAULT_CONSENT);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carica il consenso dal localStorage al mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);

        // Verifica se il consenso è scaduto (6 mesi)
        if (isConsentExpired(parsedConsent.timestamp)) {
          localStorage.removeItem(COOKIE_CONSENT_KEY);
          setConsent(DEFAULT_CONSENT);
        } else {
          setConsent(parsedConsent);
        }
      } catch (error) {
        console.error('Errore nel parsing del consenso:', error);
        setConsent(DEFAULT_CONSENT);
      }
    }

    setIsLoaded(true);
  }, []);

  // Verifica se il consenso è scaduto
  const isConsentExpired = (timestamp) => {
    if (!timestamp) return true;
    const expiryTime = new Date(timestamp).getTime() + (COOKIE_EXPIRY_MONTHS * 30 * 24 * 60 * 60 * 1000);
    return Date.now() > expiryTime;
  };

  // Salva il consenso nel localStorage
  const saveConsent = useCallback((newConsent) => {
    const consentData = {
      ...newConsent,
      timestamp: Date.now(),
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    setConsent(consentData);

    // Emetti evento personalizzato per notificare il caricamento degli script
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consentData }));
  }, []);

  // Accetta tutti i cookie
  const acceptAll = useCallback(() => {
    const allAccepted = {
      status: 'accepted',
      preferences: {
        necessary: true,
        functional: true,
        analytics: true,
        marketing: true,
      },
    };
    saveConsent(allAccepted);
  }, [saveConsent]);

  // Rifiuta i cookie (tranne necessari)
  const rejectAll = useCallback(() => {
    const allRejected = {
      status: 'rejected',
      preferences: {
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
      },
    };
    saveConsent(allRejected);
  }, [saveConsent]);

  // Salva preferenze personalizzate
  const savePreferences = useCallback((preferences) => {
    const customConsent = {
      status: 'custom',
      preferences,
    };
    saveConsent(customConsent);
  }, [saveConsent]);

  // Reset del consenso (utile per test)
  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setConsent(DEFAULT_CONSENT);
  }, []);

  // Verifica se una categoria è consentita
  const isConsentGiven = useCallback((category) => {
    return consent.preferences[category] || category === 'necessary';
  }, [consent]);

  return {
    consent,
    isLoaded,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
    isConsentGiven,
    consentStatus: consent.status,
    preferences: consent.preferences,
  };
};
