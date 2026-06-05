import "./App.css";
import { useState } from "react";
import {
  CookieBanner,
  CookiePreferencesPanel,
  ModifyCookieButton,
} from "./components/Cookie";

import Footer from "./components/Footer";
import IntroCard from "./components/IntroCard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <CookieBanner showCustomizePanel={() => setIsPanelOpen(true)} />
      <CookiePreferencesPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IntroCard />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  );
}

export default App;
