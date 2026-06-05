import React, { useState, useEffect } from "react";
import { useCookieConsent } from "./useCookieConsent";
import "./cookieConsent.css";

/**
 * CookiePreferencesPanel - Pannello avanzato per personalizzare le preferenze cookie
 * Mostra le categorie di cookie con toggle per selezionare quali accettare
 */
const CookiePreferencesPanel = ({
  isOpen = false,
  onClose,
  privacyPolicyUrl = "/privacy",
  cookiePolicyUrl = "/cookies",
}) => {
  const { preferences, isLoaded, savePreferences, acceptAll, rejectAll } =
    useCookieConsent();
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  // Sincronizza le preferenze locali con quelle salvate
  useEffect(() => {
    // Avoid synchronous setState inside effect to prevent cascading renders.
    // Schedule the state update on the next macrotask instead.
    if (isOpen) {
      const t = setTimeout(() => {
        setLocalPreferences(preferences);
        setHasChanges(false);
      }, 0);

      return () => clearTimeout(t);
    }
    return undefined;
  }, [preferences, isOpen]);

  // Gestisci il cambio di un toggle
  const handleToggleChange = (category) => {
    if (category === "necessary") return; // Necessari sempre attivi

    setLocalPreferences({
      ...localPreferences,
      [category]: !localPreferences[category],
    });
    setHasChanges(true);
  };

  // Salva le preferenze personalizzate
  const handleSavePreferences = () => {
    savePreferences(localPreferences);
    onClose?.();
  };

  // Accetta tutti i cookie
  const handleAcceptAll = () => {
    acceptAll();
    onClose?.();
  };

  // Rifiuta tutti i cookie (tranne necessari)
  const handleRejectAll = () => {
    rejectAll();
    onClose?.();
  };

  if (!isOpen || !isLoaded) return null;

  // Definizione delle categorie di cookie
  const cookieCategories = [
    {
      id: "necessary",
      title: "Cookie Necessari",
      description:
        "Essenziali per il funzionamento del sito. Non possono essere disattivati.",
      icon: "🔒",
      disabled: true,
    },
    {
      id: "functional",
      title: "Cookie Funzionali",
      description:
        "Migliorano la tua esperienza con preferenze e impostazioni personalizzate.",
      icon: "⚙️",
      disabled: false,
    },
    {
      id: "analytics",
      title: "Cookie Analytics",
      description:
        "Ci aiutano a capire come utilizzi il sito per migliorarlo continuamente.",
      icon: "📊",
      disabled: false,
    },
    {
      id: "marketing",
      title: "Cookie Marketing",
      description:
        "Utilizzati per mostrarti annunci pertinenti e tracciare il ROI delle campagne.",
      icon: "📢",
      disabled: false,
    },
  ];

  return (
    <>
      {/* Overlay sfumato */}
      <div
        className="cookie-preferences-overlay"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Pannello principale */}
      <div
        className="cookie-preferences-panel"
        role="dialog"
        aria-labelledby="preferences-title"
      >
        {/* Header */}
        <div className="cookie-preferences-header">
          <h2 id="preferences-title" className="cookie-preferences-title">
            Preferenze Cookie
          </h2>
          <button
            className="cookie-preferences-close"
            onClick={onClose}
            aria-label="Chiudi il pannello delle preferenze"
          >
            ✕
          </button>
        </div>

        {/* Descrizione */}
        <p className="cookie-preferences-intro">
          Personalizza le tue preferenze per i cookie. I cookie necessari sono
          sempre attivi per garantire il corretto funzionamento del sito.
        </p>

        {/* Liste delle categorie */}
        <div className="cookie-categories">
          {cookieCategories.map((category) => (
            <div key={category.id} className="cookie-category-item">
              <div className="cookie-category-info">
                <div className="cookie-category-header">
                  <span className="cookie-category-icon">{category.icon}</span>
                  <h3 className="cookie-category-title">{category.title}</h3>
                </div>
                <p className="cookie-category-description">
                  {category.description}
                </p>
              </div>

              {/* Toggle */}
              <div className="cookie-category-toggle">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={localPreferences[category.id] || false}
                    onChange={() => handleToggleChange(category.id)}
                    disabled={category.disabled}
                    aria-label={`${category.disabled ? "Sempre attivo" : "Attiva"} ${category.title}`}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Link legali */}
        <div className="cookie-legal-links">
          <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <span className="cookie-link-separator">|</span>
          <a href={cookiePolicyUrl} target="_blank" rel="noopener noreferrer">
            Cookie Policy
          </a>
        </div>

        {/* Azioni */}
        <div className="cookie-preferences-actions">
          <button
            className="cookie-btn cookie-btn-outline"
            onClick={handleRejectAll}
            aria-label="Rifiuta tutti i cookie opzionali"
          >
            Rifiuta Opzionali
          </button>

          <button
            className="cookie-btn cookie-btn-primary"
            onClick={handleAcceptAll}
            aria-label="Accetta tutti i cookie"
          >
            Accetta Tutto
          </button>

          <button
            className="cookie-btn cookie-btn-save"
            onClick={handleSavePreferences}
            disabled={!hasChanges}
            aria-label="Salva le tue preferenze personalizzate"
          >
            Salva Preferenze
          </button>
        </div>

        {/* Accento decorativo */}
        <div className="cookie-preferences-accent"></div>
      </div>
    </>
  );
};

export default CookiePreferencesPanel;
