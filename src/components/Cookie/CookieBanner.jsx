import React, { useState, useEffect } from "react";
import { useCookieConsent } from "./useCookieConsent";
import "./cookieConsent.css";

/**
 * CookieBanner - Componente del banner cookie iniziale
 * Mostra il banner con opzioni: Accetta tutto, Rifiuta tutto, Personalizza
 */
const CookieBanner = ({
  onAccept,
  onReject,
  onCustomize,
  showCustomizePanel,
  privacyPolicyUrl = "/privacy",
  cookiePolicyUrl = "/cookies",
}) => {
  const { consentStatus, isLoaded, acceptAll, rejectAll } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(consentStatus === "pending");
    }
  }, [isLoaded, consentStatus]);

  const handleAcceptAll = () => {
    acceptAll();
    onAccept?.();
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    onReject?.();
    setIsVisible(false);
  };

  const handleCustomize = () => {
    showCustomizePanel?.();
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner-overlay">
      <div
        className="cookie-banner"
        role="dialog"
        aria-labelledby="cookie-title"
      >
        <div className="cookie-banner-content">
          {/* Titolo */}
          <h2 id="cookie-title" className="cookie-banner-title">
            Preferenze Cookie
          </h2>

          {/* Descrizione */}
          <p className="cookie-banner-description">
            Utilizziamo i cookie per migliorare la tua esperienza di
            navigazione, analizzare il traffico del sito e personalizzare i
            contenuti. Leggi la nostra{" "}
            <a
              href={privacyPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              informativa sulla privacy
            </a>{" "}
            e la{" "}
            <a href={cookiePolicyUrl} target="_blank" rel="noopener noreferrer">
              policy sui cookie
            </a>
            .
          </p>

          {/* Pulsanti */}
          <div className="cookie-banner-actions">
            <button
              className="cookie-btn cookie-btn-secondary"
              onClick={handleRejectAll}
              aria-label="Rifiuta tutti i cookie"
            >
              Rifiuta
            </button>

            <button
              className="cookie-btn cookie-btn-outline"
              onClick={handleCustomize}
              aria-label="Personalizza le preferenze dei cookie"
            >
              Personalizza
            </button>

            <button
              className="cookie-btn cookie-btn-primary"
              onClick={handleAcceptAll}
              aria-label="Accetta tutti i cookie"
            >
              Accetta Tutto
            </button>
          </div>
        </div>

        {/* Barra inferiore decorativa */}
        <div className="cookie-banner-accent"></div>
      </div>
    </div>
  );
};

export default CookieBanner;
