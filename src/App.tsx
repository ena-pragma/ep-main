import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Contact from "./components/Contact";
import { GoogleTagManager } from './components/GoogleTagManager';

const App: React.FC = () => {
  return (
    <>
      <GoogleTagManager />
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <CaseStudies />
        <Contact />
      </div>
    </>
  );
};

export default App;