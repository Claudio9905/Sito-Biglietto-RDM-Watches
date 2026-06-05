import React, { useState } from 'react';
import CookiePreferencesPanel from './CookiePreferencesPanel';
import './cookieConsent.css';

/**
 * ModifyCookieButton - Bottone per riaprire il pannello di preferenze cookie
 * Da posizionare nel footer o in un menu di preferenze
 *
 * @example
 * <ModifyCookieButton className="footer-button" />
 */
const ModifyCookieButton = ({ className, text = 'Modifica Preferenze Cookie' }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <>
      <button
        className={`cookie-modify-button ${className || ''}`}
        onClick={handleOpenPanel}
        aria-label="Apri il pannello di preferenze cookie"
      >
        {text}
      </button>

      <CookiePreferencesPanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </>
  );
};

export default ModifyCookieButton;
