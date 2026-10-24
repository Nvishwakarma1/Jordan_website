import { useState, useEffect } from "react";
import FrameScrollIntro from "./components/FrameScrollIntro";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import CustomerReview from "./components/CustomerReview";
import Contact from "./components/Contact";
import EstimateCalculator from "./components/EstimateCalculator";
import YouTubeButton from "./components/YouTubeButton";
import "./App.css";

function App() {
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    // Reset scroll on refresh to always start at the intro sequence
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">
      {/* 300-Frame Scrollytelling Intro that morphs into the hero-carousel */}
      {!introCompleted && (
        <FrameScrollIntro onComplete={handleIntroComplete} />
      )}

      {/* Main Website: Preserved 100% as it was */}
      <div className={`main-website-wrapper ${!introCompleted ? 'intro-overlay-active' : 'intro-revealed'}`}>
        <Navbar />
        <EstimateCalculator />
        <YouTubeButton />
        <HeroSection />
        <Services />
        <Portfolio />
        <About />
        <CustomerReview />
        <Contact />
      </div>
    </div>
  );
}
export default App;
