/**
 * Gestore del caricamento condizionato degli script basato sul consenso cookie
 * Permette di caricare script (Analytics, Marketing, ecc.) solo dopo il consenso dell'utente
 */

// Registra gli script in attesa di consenso
const pendingScripts = {};

/**
 * Registra uno script che deve essere caricato solo dopo il consenso
 * @param {string} category - Categoria cookie ('analytics', 'marketing', 'functional')
 * @param {string} src - URL dello script
 * @param {object} options - Opzioni aggiuntive (async, defer, ecc.)
 */
export const registerScript = (category, src, options = {}) => {
  if (!pendingScripts[category]) {
    pendingScripts[category] = [];
  }

  pendingScripts[category].push({ src, options });
};

/**
 * Carica uno script in modo asincrono
 * @param {string} src - URL dello script
 * @param {object} options - Opzioni aggiuntive
 * @returns {Promise} Promessa che si risolve quando lo script è caricato
 */
const loadScript = (src, options = {}) => {
  return new Promise((resolve, reject) => {
    // Verifica se lo script è già caricato
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';

    // Applica le opzioni
    if (options.async !== false) script.async = true;
    if (options.defer) script.defer = true;
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }

    script.onload = resolve;
    script.onerror = () => reject(new Error(`Errore nel caricamento dello script: ${src}`));

    document.head.appendChild(script);
  });
};

/**
 * Carica gli script per una categoria di consenso specifica
 * @param {string} category - Categoria cookie
 * @param {string} status - Stato del consenso (true/false)
 */
export const loadScriptsByCategory = async (category, status) => {
  if (!status || !pendingScripts[category]) {
    return;
  }

  for (const script of pendingScripts[category]) {
    try {
      await loadScript(script.src, script.options);
    } catch (error) {
      console.error(`Errore nel caricamento dello script per ${category}:`, error);
    }
  }
};

/**
 * Carica uno script specifico solo se il consenso è stato dato
 * Funzione helper principale da usare nel codice
 *
 * @param {string} category - Categoria cookie ('analytics', 'marketing', 'functional')
 * @param {string} src - URL dello script (opzionale, se registrato in precedenza)
 * @param {function} onConsented - Callback da eseguire quando il consenso è dato
 * @param {object} options - Opzioni aggiuntive
 *
 * @example
 * loadScriptIfConsented('analytics', 'https://www.googletagmanager.com/gtag/js?id=GA_ID', () => {
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', 'GA_ID');
 * });
 */
export const loadScriptIfConsented = (category, src, onConsented, options = {}) => {
  // Se src non è fornito, usa quello registrato
  if (typeof src === 'function') {
    onConsented = src;
    src = null;
  }

  // Listener per il cambio di consenso
  const handleConsentUpdate = (event) => {
    const { preferences } = event.detail;

    if (preferences[category]) {
      // Se src è fornito, carica lo script
      if (src) {
        loadScript(src, options)
          .then(() => {
            if (onConsented) onConsented();
          })
          .catch((error) => {
            console.error(`Errore nel caricamento dello script: ${src}`, error);
          });
      } else if (onConsented) {
        // Altrimenti esegui direttamente il callback
        onConsented();
      }

      // Rimuovi il listener dopo il primo uso
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
    }
  };

  // Aggiungi listener per futuri aggiornamenti del consenso
  window.addEventListener('cookieConsentUpdated', handleConsentUpdate);

  // Verifica il consenso attuale (salvatato in localStorage)
  const savedConsent = localStorage.getItem('rdm_cookie_consent');
  if (savedConsent) {
    try {
      const consentData = JSON.parse(savedConsent);
      if (consentData.preferences[category]) {
        if (src) {
          loadScript(src, options)
            .then(() => {
              if (onConsented) onConsented();
            })
            .catch((error) => {
              console.error(`Errore nel caricamento dello script: ${src}`, error);
            });
        } else if (onConsented) {
          onConsented();
        }
        window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
      }
    } catch (error) {
      console.error('Errore nel parsing del consenso:', error);
    }
  }
};

/**
 * Carica tutti gli script in base al consenso fornito
 * @param {object} preferences - Oggetto con i dati di preferenza
 */
export const loadAllScriptsByPreferences = async (preferences) => {
  const categories = ['functional', 'analytics', 'marketing'];

  for (const category of categories) {
    if (preferences[category]) {
      await loadScriptsByCategory(category, true);
    }
  }
};
