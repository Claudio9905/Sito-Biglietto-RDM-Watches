# 🍪 Cookie Consent System - Quick Start (5 minuti)

Integra il sistema cookie conforme al GDPR in 5 semplici step!

---

## ⚡ Step 1: Importa il Banner

Apri il tuo `App.jsx` e aggiungi:

```jsx
import { CookieBanner } from './components/Cookie';

function App() {
  return (
    <>
      <CookieBanner />
      {/* Il resto della tua app */}
    </>
  );
}
```

**Fatto!** Il banner apparirà al primo accesso dell'utente.

---

## 🎯 Step 2: Aggiungi il Pannello di Personalizzazione

```jsx
import { useState } from 'react';
import { CookieBanner, CookiePreferencesPanel } from './components/Cookie';

function App() {
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

## 📱 Step 3: Aggiungi il Bottone nel Footer

```jsx
import { ModifyCookieButton } from './components/Cookie';

export default function Footer() {
  return (
    <footer>
      <ModifyCookieButton text="🍪 Modifica Cookie" />
    </footer>
  );
}
```

---

## 📊 Step 4: Carica Google Analytics Condizionatamente

Nel tuo `App.jsx` o `main.jsx`:

```jsx
import { loadScriptIfConsented } from './components/Cookie';

// All'inizio del file
loadScriptIfConsented(
  'analytics',
  'https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID',
  () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-YOUR_ID');
  }
);
```

---

## 🔗 Step 5: Personalizza gli URL

```jsx
<CookieBanner
  privacyPolicyUrl="https://tuosito.com/privacy"
  cookiePolicyUrl="https://tuosito.com/cookies"
/>
```

---

## ✅ Test Rapido

1. **Apri il sito in modalità anonima (Incognito)**
2. **Dovresti vedere il banner in fondo**
3. **Clicca su "Accetta Tutto"**
4. **Apri DevTools (F12) > Application > Local Storage**
5. **Verifica `rdm_cookie_consent` con status "accepted"**

---

## 🎨 Personalizzazione Colori (Opzionale)

Crea un file `cookieTheme.css`:

```css
:root {
  --cookie-color-primary: #2a2a2a;
  --cookie-color-accent: #d4af37;  /* Oro */
  --cookie-color-text: #ffffff;
}
```

Importa nel tuo `App.jsx`:

```jsx
import './cookieTheme.css';
```

---

## 📚 Risorse

- **README.md** - Documentazione completa
- **INTEGRATION_GUIDE.md** - Guida dettagliata di integrazione
- **EXAMPLE_App.jsx** - Esempio di App.jsx completa
- **EXAMPLE_App.css** - Esempio di CSS

---

## 🚀 Sei Pronto!

Il sistema cookie è ora integrato e conforme al GDPR.

**Domande?** Consulta il README.md per dettagli completi.
