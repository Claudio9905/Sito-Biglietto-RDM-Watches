/**
 * ESEMPIO COMPLETO - App.jsx per RDM Watches
 * Questo file mostra come integrare completamente il sistema cookie nel tuo progetto
 */

import { useState, useEffect } from 'react';
import {
  CookieBanner,
  CookiePreferencesPanel,
  ModifyCookieButton,
  loadScriptIfConsented,
} from './components/Cookie';
import './App.css';

// Carica Google Analytics condizionatamente
loadScriptIfConsented(
  'analytics',
  'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX',
  () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX', { anonymize_ip: true });
  }
);

// Carica Facebook Pixel condizionatamente
loadScriptIfConsented('marketing', 'https://connect.facebook.net/en_US/fbevents.js', () => {
  if (window.fbq) {
    fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');
    fbq('track', 'PageView');
  }
});

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      {/* ========== BANNER PRINCIPALE ========== */}
      <CookieBanner
        showCustomizePanel={() => setIsPanelOpen(true)}
        privacyPolicyUrl="https://rdmwatches.com/privacy"
        cookiePolicyUrl="https://rdmwatches.com/cookies"
        onAccept={() => {
          console.log('✅ Cookie accettati');
          // Puoi inviare un evento al tuo backend qui
        }}
        onReject={() => {
          console.log('❌ Cookie rifiutati');
        }}
      />

      {/* ========== PANNELLO DI PREFERENZE ========== */}
      <CookiePreferencesPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        privacyPolicyUrl="https://rdmwatches.com/privacy"
        cookiePolicyUrl="https://rdmwatches.com/cookies"
      />

      {/* ========== HEADER ========== */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>⌚ RDM WATCHES</h1>
          </div>
          <nav className="nav">
            <a href="/">Home</a>
            <a href="/products">Collezioni</a>
            <a href="/about">Chi Siamo</a>
            <a href="/contact">Contatti</a>
          </nav>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="main-content">
        <section className="hero">
          <h2>Lusso e Precisione nel Tempo</h2>
          <p>Scopri la nostra collezione esclusiva di orologi di lusso</p>
          <button className="btn-primary">Scopri di Più</button>
        </section>

        <section className="featured-products">
          <h2>Collezioni in Evidenza</h2>
          <div className="products-grid">
            <div className="product-card">
              <img src="watch1.jpg" alt="Orologio Luxury" />
              <h3>Eleganza Classica</h3>
              <p>Design senza tempo dal 1990</p>
              <span className="price">€4,999</span>
            </div>
            <div className="product-card">
              <img src="watch2.jpg" alt="Orologio Sport" />
              <h3>Sportive Edge</h3>
              <p>Performance e stile combinati</p>
              <span className="price">€3,499</span>
            </div>
            <div className="product-card">
              <img src="watch3.jpg" alt="Orologio Modern" />
              <h3>Modern Fusion</h3>
              <p>Innovazione nel design</p>
              <span className="price">€2,999</span>
            </div>
          </div>
        </section>
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>RDM WATCHES</h4>
            <p>Orologi di lusso dal 1990</p>
          </div>

          <div className="footer-section">
            <h4>Informazioni</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">Chi Siamo</a>
              </li>
              <li>
                <a href="/contact">Contatti</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legale</h4>
            <ul>
              <li>
                <a href="https://rdmwatches.com/terms">Termini di Servizio</a>
              </li>
              <li>
                <a href="https://rdmwatches.com/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="https://rdmwatches.com/cookies">Cookie Policy</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Preferenze</h4>
            <p>Gestisci le tue preferenze relative ai cookie:</p>
            <ModifyCookieButton
              text="🍪 Modifica Preferenze Cookie"
              className="footer-cookie-btn"
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 RDM Watches. Tutti i diritti riservati.</p>
          <p>Fatto con ❤️ per i veri intenditori di orologi</p>
        </div>
      </footer>
    </>
  );
}

export default App;

/**
 * ============================================================================
 * NOTE DI IMPLEMENTAZIONE
 * ============================================================================
 *
 * 1. GOOGLE ANALYTICS:
 *    - Sostituisci 'G-XXXXXXX' con il tuo ID Google Analytics 4
 *    - Verifica in DevTools > Network che gtag.js si carichi solo se
 *      l'utente ha consentito i cookie Analytics
 *
 * 2. FACEBOOK PIXEL:
 *    - Sostituisci 'YOUR_FACEBOOK_PIXEL_ID' con il tuo ID
 *    - Controlla in Network che fbevents.js si carichi solo se
 *      l'utente ha consentito i cookie Marketing
 *
 * 3. PRIVACY E COOKIE POLICY:
 *    - Personalizza gli URL per puntare alle tue pagine legali
 *    - Assicurati che le pagine contengano informazioni complete
 *      sui cookie utilizzati
 *
 * 4. STILE:
 *    - I componenti cookie usano CSS separato in cookieConsent.css
 *    - Le variabili CSS possono essere personalizzate nel tuo App.css
 *
 * 5. TESTING:
 *    - Apri il DevTools (F12)
 *    - Application > Local Storage > rdm_cookie_consent
 *    - Controlla che il consenso sia salvato correttamente
 *
 * 6. CONFORMITÀ GDPR:
 *    - Il banner mostra link obbligatori alle policy legali
 *    - L'utente può rifiutare il tracciamento
 *    - È sempre possibile modificare il consenso
 *    - Il consenso è valido per 6 mesi
 *
 * ============================================================================
 */
