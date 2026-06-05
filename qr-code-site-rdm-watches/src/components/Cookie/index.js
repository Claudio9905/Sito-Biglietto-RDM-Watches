/**
 * Cookie Consent System - Entry Point
 * Esporta tutti i componenti e gli helper per la gestione del consenso cookie
 */

// Custom Hook
export { useCookieConsent } from './useCookieConsent';

// Script Loader
export {
  registerScript,
  loadScriptsByCategory,
  loadScriptIfConsented,
  loadAllScriptsByPreferences,
} from './cookieScriptLoader';

// Componenti
export { default as CookieBanner } from './CookieBanner';
export { default as CookiePreferencesPanel } from './CookiePreferencesPanel';
export { default as ModifyCookieButton } from './ModifyCookieButton';
