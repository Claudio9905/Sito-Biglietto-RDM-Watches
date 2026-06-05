# 🍪 Cookie Consent System - Documentazione Completa

Un sistema premium, conforme al GDPR, per la gestione del consenso cookie in React. Modulare, elegante e facile da integrare.

---

## 📋 Indice

1. [Installazione](#installazione)
2. [Quick Start](#quick-start)
3. [Componenti](#componenti)
4. [Hook Personalizzato](#hook-personalizzato)
5. [Script Loader](#script-loader)
6. [Esempi di Utilizzo](#esempi-di-utilizzo)
7. [Personalizzazione](#personalizzazione)
8. [Conformità GDPR](#conformità-gdpr)
9. [Troubleshooting](#troubleshooting)

---

## 📦 Installazione

### Paso 1: Copiare i file

I file sono già posizionati nella directory `src/components/Cookie/`:

```
src/components/Cookie/
├── index.js
├── useCookieConsent.js
├── cookieScriptLoader.js
├── CookieBanner.jsx
├── CookiePreferencesPanel.jsx
├── ModifyCookieButton.jsx
└── cookieConsent.css
```

### Passo 2: Importare nel tuo App.jsx

```jsx
import { CookieBanner, CookiePreferencesPanel, useCookieConsent } from './components/Cookie';
import { useState } from 'react';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <CookieBanner
        showCustomizePanel={() => setIsPanelOpen(true)}
        privacyPolicyUrl="/privacy"
        cookiePolicyUrl="/cookies"
      />

      <CookiePreferencesPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />

      {/* Il resto della tua app */}
    </>
  );
}

export default App;
```

---

## 🚀 Quick Start

### Integrazione Minima

```jsx
import { CookieBanner } from './components/Cookie';

export default function App() {
  return <CookieBanner />;
}
```

Questo mostra il banner e gestisce il consenso automaticamente.

### Con Preferenze Personalizzabili

```jsx
import { CookieBanner, CookiePreferencesPanel } from './components/Cookie';
import { useState } from 'react';

export default function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <CookieBanner showCustomizePanel={() => setIsPanelOpen(true)} />
      <CookiePreferencesPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
}
```

---

## 🎨 Componenti

### 1. **CookieBanner**

Banner iniziale mostrato all'utente che non ha ancora espresso il consenso.

#### Props

| Prop | Tipo | Predefinito | Descrizione |
|------|------|-------------|-------------|
| `onAccept` | function | - | Callback quando l'utente accetta tutto |
| `onReject` | function | - | Callback quando l'utente rifiuta |
| `onCustomize` | function | - | Callback quando apre il pannello personalizzato |
| `showCustomizePanel` | function | - | Funzione per aprire il pannello di personalizzazione |
| `privacyPolicyUrl` | string | `/privacy` | URL della privacy policy |
| `cookiePolicyUrl` | string | `/cookies` | URL della cookie policy |

#### Esempio

```jsx
<CookieBanner
  onAccept={() => console.log('Cookie accettati')}
  onReject={() => console.log('Cookie rifiutati')}
  showCustomizePanel={() => setIsPanelOpen(true)}
  privacyPolicyUrl="https://example.com/privacy"
  cookiePolicyUrl="https://example.com/cookies"
/>
```

---

### 2. **CookiePreferencesPanel**

Pannello modale per personalizzare le preferenze cookie con toggle per ogni categoria.

#### Props

| Prop | Tipo | Predefinito | Descrizione |
|------|------|-------------|-------------|
| `isOpen` | boolean | false | Se il pannello è visibile |
| `onClose` | function | - | Callback per chiudere il pannello |
| `privacyPolicyUrl` | string | `/privacy` | URL della privacy policy |
| `cookiePolicyUrl` | string | `/cookies` | URL della cookie policy |

#### Esempio

```jsx
const [isOpen, setIsOpen] = useState(false);

<CookiePreferencesPanel
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  privacyPolicyUrl="https://example.com/privacy"
  cookiePolicyUrl="https://example.com/cookies"
/>
```

---

### 3. **ModifyCookieButton**

Bottone per permettere all'utente di modificare le preferenze cookie in qualsiasi momento.

#### Props

| Prop | Tipo | Predefinito | Descrizione |
|------|------|-------------|-------------|
| `className` | string | - | Classe CSS personalizzata |
| `text` | string | "Modifica Preferenze Cookie" | Testo del bottone |

#### Esempio - Nel Footer

```jsx
import { ModifyCookieButton } from './components/Cookie';

export default function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/cookies">Cookie Policy</a>
        <ModifyCookieButton text="⚙️ Cookie Settings" className="footer-button" />
      </div>
    </footer>
  );
}
```

---

## 🪝 Hook Personalizzato

### `useCookieConsent()`

Hook per accedere e gestire il consenso cookie all'interno di qualsiasi componente.

#### Ritorna

```jsx
{
  consent,              // Oggetto consenso completo
  isLoaded,             // boolean: Se il consenso è caricato
  acceptAll,            // function: Accetta tutti i cookie
  rejectAll,            // function: Rifiuta i cookie opzionali
  savePreferences,      // function: Salva preferenze personalizzate
  resetConsent,         // function: Resetta il consenso
  isConsentGiven,       // function: Verifica se una categoria è consentita
  consentStatus,        // string: 'pending', 'accepted', 'rejected', 'custom'
  preferences,          // object: { necessary, functional, analytics, marketing }
}
```

#### Esempio

```jsx
import { useCookieConsent } from './components/Cookie';

function MyComponent() {
  const { consentStatus, preferences, isConsentGiven, acceptAll } = useCookieConsent();

  return (
    <div>
      <p>Stato consenso: {consentStatus}</p>
      <p>Analytics abilitato: {isConsentGiven('analytics') ? 'Sì' : 'No'}</p>
      <button onClick={acceptAll}>Accetta Tutto</button>
    </div>
  );
}
```

---

## 📡 Script Loader

Gestore specializzato per caricare script (Analytics, Marketing) solo dopo il consenso.

### `loadScriptIfConsented(category, src, callback, options)`

Carica uno script solo se l'utente ha dato il consenso per quella categoria.

#### Parametri

| Parametro | Tipo | Descrizione |
|-----------|------|-------------|
| `category` | string | Categoria cookie: `'analytics'`, `'marketing'`, `'functional'` |
| `src` | string | URL dello script |
| `callback` | function | Funzione da eseguire dopo il caricamento |
| `options` | object | Opzioni aggiuntive (async, defer, attributes) |

#### Esempio - Google Analytics

```jsx
// Carica GA solo se l'utente consente Analytics
import { loadScriptIfConsented } from './components/Cookie';

loadScriptIfConsented('analytics', 'https://www.googletagmanager.com/gtag/js?id=GA_4_ID', () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'GA_4_ID');
});
```

#### Esempio - Facebook Pixel

```jsx
loadScriptIfConsented('marketing', 'https://connect.facebook.net/en_US/fbevents.js', () => {
  fbq('init', 'FACEBOOK_PIXEL_ID');
  fbq('track', 'PageView');
});
```

#### Esempio - Hotjar

```jsx
loadScriptIfConsented('analytics', 'https://static.hotjar.com/c/hotjar-VERSION.js?sv=6', () => {
  hj('identify', {
    userId: 12345,
    userEmail: 'name@example.com',
  });
});
```

---

### `registerScript(category, src, options)`

Registra uno script che verrà caricato in batch quando il consenso per la categoria è dato.

```jsx
registerScript('analytics', 'https://example.com/analytics.js', { async: true });
registerScript('marketing', 'https://example.com/marketing.js');
```

---

### `loadAllScriptsByPreferences(preferences)`

Carica tutti gli script registrati basandosi sull'oggetto preferences.

```jsx
const preferences = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: false,
};

loadAllScriptsByPreferences(preferences);
```

---

## 💡 Esempi di Utilizzo

### Esempio 1: Integrazione Completa nel Footer

```jsx
import { ModifyCookieButton } from './components/Cookie';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Informazioni Legali</h4>
          <ul>
            <li><a href="/terms">Termini di Servizio</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Preferenze</h4>
          <ModifyCookieButton text="🍪 Gestisci Cookie" />
        </div>
      </div>

      <p>&copy; 2024 RDM Watches. All rights reserved.</p>
    </footer>
  );
}
```

---

### Esempio 2: Caricamento Condizionale di Google Analytics

```jsx
// App.jsx o main.jsx
import { loadScriptIfConsented } from './components/Cookie';

// Carica GA all'avvio dell'app
loadScriptIfConsented('analytics', 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX', () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
});
```

---

### Esempio 3: Monitoraggio Consenso in Tempo Reale

```jsx
import { useCookieConsent } from './components/Cookie';
import { useEffect } from 'react';

export default function ConsentMonitor() {
  const { preferences } = useCookieConsent();

  useEffect(() => {
    // Ogni volta che cambiano le preferenze, puoi inviare i dati a un backend
    console.log('Preferenze aggiornate:', preferences);

    // Esempio: Invia al backend
    fetch('/api/track-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences, timestamp: new Date() }),
    });
  }, [preferences]);

  return null; // Questo è un componente per effetti collaterali
}
```

---

### Esempio 4: Integrazione con Sentry (Error Tracking)

```jsx
import * as Sentry from '@sentry/react';
import { loadScriptIfConsented } from './components/Cookie';

// Carica Sentry solo se funzionali o analytics sono consentiti
loadScriptIfConsented('analytics', () => {
  Sentry.init({
    dsn: 'https://your-sentry-dsn@sentry.io/project-id',
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  });
});
```

---

### Esempio 5: Personalizzazione Stile (Dark Mode)

```css
/* Nel tuo CSS personalizzato, sovrascrivi le variabili */
:root {
  --cookie-color-primary: #2c2c2c;
  --cookie-color-accent: #ffd700; /* Giallo gold */
  --cookie-color-text: #ffffff;
  --cookie-color-bg-light: #1a1a1a;
}
```

---

## 🎨 Personalizzazione

### Variabili CSS Disponibili

Tutte le variabili CSS sono definite in `cookieConsent.css` e possono essere sovrascritte:

```css
:root {
  --cookie-color-primary: #1a1a1a;        /* Colore primario (nero) */
  --cookie-color-secondary: #f5f5f5;      /* Colore secondario (bianco) */
  --cookie-color-accent: #d4af37;         /* Colore accento (oro) */
  --cookie-color-text: #333333;           /* Colore testo */
  --cookie-color-text-light: #666666;     /* Testo leggero */
  --cookie-color-border: #e0e0e0;         /* Colore bordi */
  --cookie-color-bg-light: #fafafa;       /* Background leggero */
  --cookie-duration: 300ms;               /* Durata animazioni */
  --cookie-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Easing */
}
```

### Personalizzazione della Posizione

Per cambiare la posizione del banner da fondo a top:

```css
.cookie-banner-overlay {
  align-items: flex-start; /* Cambia da flex-end */
}

.cookie-banner {
  animation: slideDown 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

---

## ✅ Conformità GDPR

Questo sistema è conforme ai requisiti GDPR:

### ✓ Consenso Esplicito

- L'utente deve dare il consenso prima che script non-essenziali vengano caricati
- Il banner appare prima di qualsiasi tracciamento (ad eccezione dei cookie necessari)

### ✓ Granularità

- 4 categorie selezionabili: Necessari, Funzionali, Analytics, Marketing
- L'utente può personalizzare il consenso per categoria

### ✓ Rifiuto Facile

- "Rifiuta tutto" è altrettanto prominente di "Accetta tutto"
- È possibile modificare il consenso in qualsiasi momento

### ✓ Persistenza

- Il consenso è salvato nel localStorage
- Viene richiesto nuovamente dopo 6 mesi

### ✓ Tracciamento Trasparente

- Link obbligatori a Privacy Policy e Cookie Policy
- Timestamp del consenso salvato

### ✓ Accesso e Portabilità

- L'utente può visualizzare e modificare le sue preferenze in qualsiasi momento
- Le preferenze sono esportabili

---

## 🔧 Troubleshooting

### 1. Il banner non appare

**Problema**: Il banner non viene visualizzato anche al primo accesso.

**Soluzione**:

```jsx
// Verificare che il componente sia correttamente importato e renderizzato
import { CookieBanner } from './components/Cookie';

function App() {
  return <CookieBanner />; // Deve essere nel componente root
}
```

---

### 2. Gli script non vengono caricati

**Problema**: Google Analytics o altri script non si caricano neanche dopo aver dato il consenso.

**Soluzione**:

```jsx
// Verificare che il localStorage sia abilitato
console.log(localStorage.getItem('rdm_cookie_consent'));

// Usare la console per controllare se l'evento è emesso
window.addEventListener('cookieConsentUpdated', (event) => {
  console.log('Consenso aggiornato:', event.detail);
});

// Verificare che il URL dello script sia corretto
loadScriptIfConsented('analytics', 'CORRECT_URL_HERE', () => {
  console.log('Script caricato!');
});
```

---

### 3. Il consenso si resetta

**Problema**: Il consenso viene richiesto più volte anche se è già stato dato.

**Soluzione**:

- Verificare la scadenza: il consenso scade dopo 6 mesi
- Controllare se `localStorage` è disabilitato nel browser
- Verificare che non ci sia una pulizia automatica della cache

```jsx
// Disabilita la scadenza di 6 mesi (modificare useCookieConsent.js)
// Cambia COOKIE_EXPIRY_MONTHS = 6; in COOKIE_EXPIRY_MONTHS = 24;
```

---

### 4. Styling non funziona

**Problema**: I CSS non vengono applicati correttamente.

**Soluzione**:

```jsx
// Verificare che il file CSS sia importato nel componente
import './cookieConsent.css';

// Controllare che non ci sia un conflitto CSS
.cookie-banner {
  /* Verifica che non ci siano CSS globali che sovrascrivono */
}
```

---

## 📞 Supporto

Per problemi o domande:

1. Controlla il file di log della console del browser (F12)
2. Verifica che `localStorage` sia abilitato
3. Assicurati che i file CSS siano importati correttamente
4. Controlla che il localStorage contenga `rdm_cookie_consent`

---

## 📄 Licenza

Questo sistema è fornito come-è per uso commerciale e personale.

---

**Versione**: 1.0.0  
**Ultimo aggiornamento**: 2024  
**Compatibile con**: React 16.8+ (Hooks)
