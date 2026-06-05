# 🚀 Guida di Integrazione - Cookie Consent System

Questa guida spiega come integrare il sistema cookie in un progetto React esistente.

---

## ⚡ Integrazione Rapida (5 minuti)

### Passo 1: Importa il Banner nel tuo App.jsx

```jsx
// src/App.jsx
import CookieBanner from './components/Cookie/CookieBanner';

function App() {
  return (
    <>
      <CookieBanner />
      {/* Il resto della tua app */}
    </>
  );
}

export default App;
```

**Pronto!** Il banner apparirà al primo accesso.

---

## 📋 Integrazione Completa (15 minuti)

### Passo 1: Struttura della Cartella

```
src/
├── components/
│   └── Cookie/                    ← Cartella del sistema cookie
│       ├── index.js
│       ├── useCookieConsent.js
│       ├── cookieScriptLoader.js
│       ├── CookieBanner.jsx
│       ├── CookiePreferencesPanel.jsx
│       ├── ModifyCookieButton.jsx
│       ├── cookieConsent.css
│       └── README.md
└── App.jsx
```

---

### Passo 2: Configura App.jsx

```jsx
// src/App.jsx
import { useState } from 'react';
import { CookieBanner, CookiePreferencesPanel } from './components/Cookie';
import './App.css';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      {/* Banner Principale */}
      <CookieBanner
        showCustomizePanel={() => setIsPanelOpen(true)}
        privacyPolicyUrl="https://example.com/privacy"
        cookiePolicyUrl="https://example.com/cookies"
        onAccept={() => console.log('✅ Cookie accettati')}
        onReject={() => console.log('❌ Cookie rifiutati')}
      />

      {/* Pannello di Personalizzazione */}
      <CookiePreferencesPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        privacyPolicyUrl="https://example.com/privacy"
        cookiePolicyUrl="https://example.com/cookies"
      />

      {/* Resto dell'app */}
      <header>
        <h1>Welcome to RDM Watches</h1>
      </header>

      <main>
        {/* Contenuto */}
      </main>

      <footer>
        {/* Footer con il bottone di modifica cookie */}
      </footer>
    </>
  );
}

export default App;
```

---

### Passo 3: Aggiungi il Bottone di Modifica nel Footer

```jsx
// src/components/Footer.jsx
import { ModifyCookieButton } from './Cookie';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-column">
          <h4>RDM Watches</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Legale</h4>
          <ul>
            <li><a href="/terms">Termini di Servizio</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Preferenze</h4>
          <ModifyCookieButton 
            text="🍪 Gestisci Preferenze Cookie" 
            className="footer-cookie-btn"
          />
        </div>
      </div>

      <p className="copyright">&copy; 2024 RDM Watches. All rights reserved.</p>
    </footer>
  );
}
```

---

### Passo 4: Integra Google Analytics (Condizionale)

```jsx
// src/main.jsx o src/App.jsx
import { loadScriptIfConsented } from './components/Cookie';

// Carica Google Analytics solo dopo il consenso dell'utente
loadScriptIfConsented(
  'analytics',
  'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX',
  () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX');
  }
);
```

---

### Passo 5: Integra Facebook Pixel (Marketing)

```jsx
// src/main.jsx o src/App.jsx
import { loadScriptIfConsented } from './components/Cookie';

// Facebook Pixel
loadScriptIfConsented(
  'marketing',
  'https://connect.facebook.net/en_US/fbevents.js',
  () => {
    fbq('init', 'TUO_FACEBOOK_PIXEL_ID');
    fbq('track', 'PageView');
  }
);
```

---

### Passo 6: Monitora il Consenso in Componenti

```jsx
// src/components/AnalyticsProvider.jsx
import { useCookieConsent } from './Cookie';

export default function AnalyticsProvider({ children }) {
  const { preferences, isConsentGiven } = useCookieConsent();

  // Usa il consenso per tracciamento personalizzato
  useEffect(() => {
    if (isConsentGiven('analytics')) {
      // Traccia l'evento
      gtag('event', 'page_view');
    }
  }, [isConsentGiven]);

  return children;
}
```

---

## 🎨 Personalizzazione dello Stile

### Tema Scuro Premium

Crea un file `cookieTheme.css` per personalizzare i colori:

```css
/* src/styles/cookieTheme.css */

:root {
  /* Tema scuro elegante */
  --cookie-color-primary: #2a2a2a;
  --cookie-color-secondary: #f0f0f0;
  --cookie-color-accent: #d4af37; /* Gold */
  --cookie-color-text: #ffffff;
  --cookie-color-text-light: #b0b0b0;
  --cookie-color-border: #444444;
  --cookie-color-bg-light: #1f1f1f;
  
  /* Animazioni */
  --cookie-duration: 300ms;
  --cookie-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Tema chiaro */
@media (prefers-color-scheme: light) {
  :root {
    --cookie-color-primary: #ffffff;
    --cookie-color-secondary: #000000;
    --cookie-color-accent: #d4af37;
    --cookie-color-text: #000000;
    --cookie-color-text-light: #666666;
  }
}
```

Importa nel tuo `App.jsx`:

```jsx
import './styles/cookieTheme.css';
import './components/Cookie/cookieConsent.css';
```

---

## 📊 Tracciamento Avanzato

### Invia Consenso a un Backend

```jsx
// src/hooks/useConsentTracking.js
import { useEffect } from 'react';
import { useCookieConsent } from '../components/Cookie';

export function useConsentTracking() {
  const { preferences } = useCookieConsent();

  useEffect(() => {
    // Invia le preferenze al backend
    navigator.sendBeacon(
      '/api/track-consent',
      JSON.stringify({
        preferences,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      })
    );
  }, [preferences]);
}

// Uso in App.jsx
import { useConsentTracking } from './hooks/useConsentTracking';

function App() {
  useConsentTracking();
  // ...
}
```

---

### Esporta Preferenze Utente

```jsx
// src/utils/exportConsent.js
export function exportConsentAsJSON() {
  const consent = localStorage.getItem('rdm_cookie_consent');
  if (!consent) return null;

  const blob = new Blob([consent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cookie-consent-${new Date().toISOString()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Uso
<button onClick={exportConsentAsJSON}>Esporta Consenso</button>
```

---

## 🔒 Caricamento Sicuro di Script

### Esempio: Hotjar (Session Recording)

```jsx
import { loadScriptIfConsented } from './components/Cookie';

loadScriptIfConsented(
  'analytics',
  'https://static.hotjar.com/c/hotjar-3.12.0.js?sv=6',
  () => {
    window.hj =
      window.hj ||
      function () {
        (window.hj.q = window.hj.q || []).push(arguments);
      };
    window.hjAttributes = {};
    hj('identify', {
      userId: 'user123',
      userEmail: 'user@example.com',
    });
  }
);
```

---

### Esempio: Intercom (Chat Support)

```jsx
loadScriptIfConsented('functional', () => {
  window.intercomSettings = {
    api_base: 'https://api-iam.intercom.io',
    app_id: 'YOUR_APP_ID',
    user_id: 'user123',
    email: 'user@example.com',
    name: 'User Name',
  };

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://widget.intercom.io/widget/YOUR_APP_ID';
  document.head.appendChild(script);
});
```

---

## ✅ Checklist di Integrazione

- [ ] Importato `CookieBanner` in `App.jsx`
- [ ] Importato `CookiePreferencesPanel` in `App.jsx`
- [ ] Aggiunto `ModifyCookieButton` nel footer
- [ ] Configurati gli URL di Privacy/Cookie Policy
- [ ] Integrato Google Analytics (se richiesto)
- [ ] Integrati altri script esterni (FB Pixel, Hotjar, ecc.)
- [ ] Testato il banner nel browser (prima volta)
- [ ] Testato il pannello di preferenze
- [ ] Testato il tracciamento di consenso
- [ ] Personalizzati i colori CSS (opzionale)
- [ ] Verificato il localStorage (F12 > Application)

---

## 🧪 Test della Integrazione

### 1. Test del Banner Iniziale

1. Apri il browser in modalità anonima (Incognito)
2. Visita il sito
3. Il banner deve apparire in fondo allo schermo

### 2. Test dell'Accettazione

1. Clicca "Accetta tutto"
2. Apri Developer Tools (F12) > Application > Local Storage
3. Verifica che esista `rdm_cookie_consent` con status: "accepted"

### 3. Test del Rifiuto

1. Cancella il localStorage
2. Clicca "Rifiuta"
3. Verifica che lo status sia "rejected"

### 4. Test della Personalizzazione

1. Cancella il localStorage
2. Clicca "Personalizza"
3. Attiva/Disattiva singole categorie
4. Clicca "Salva Preferenze"
5. Verifica che lo status sia "custom"

### 5. Test degli Script Condizionali

1. Apri il browser DevTools > Network
2. Accetta i cookie
3. Verifica che Google Analytics (`gtag.js`) si carichi
4. Rifiuta i cookie in una nuova sessione
5. Verifica che GA NON si carichi

---

## 🐛 Debugging

### Attiva il Logging

```jsx
// src/utils/consentDebug.js
export function enableConsentDebug() {
  // Monitora gli aggiornamenti del consenso
  window.addEventListener('cookieConsentUpdated', (event) => {
    console.log('🍪 Consenso aggiornato:', event.detail);
  });

  // Monitora il localStorage
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    if (key === 'rdm_cookie_consent') {
      console.log('🍪 LocalStorage aggiornato:', JSON.parse(value));
    }
    originalSetItem.apply(this, arguments);
  };
}

// Chiama in App.jsx
import { enableConsentDebug } from './utils/consentDebug';

if (process.env.NODE_ENV === 'development') {
  enableConsentDebug();
}
```

---

## 📞 Support & Issues

Se riscontri problemi:

1. **Console Error**: Controlla F12 > Console per errori
2. **Storage**: Verifica che localStorage sia abilitato
3. **CSS**: Assicurati che `cookieConsent.css` sia importato
4. **React Version**: Assicurati di usare React 16.8+

---

**Fine della Guida di Integrazione**

Sei pronto! 🚀
