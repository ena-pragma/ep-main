import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Contact from "./components/Contact";
import BlogArchive from "./components/BlogArchive";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import { GoogleTagManager } from "./components/GoogleTagManager";
import WebDesignPage from "./components/pages/WebDesign/WebDesignPage";
import QuestionnairePage from "./components/pages/WebDesign/Questionnaire/QuestionnairePage";
import BookingPage from "./components/pages/WebDesign/Booking/BookingPage";
import ThankYouPage from "./components/pages/WebDesign/ThankYou/ThankYouPage";

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <CaseStudies />
    <Contact />
  </>
);

const AppContent = () => {
  const location = useLocation();
  const isWebDesignPage = location.pathname.startsWith('/web-design');
  const isThankYouPage = location.pathname === '/thank-you';

  return (
    <div className="min-h-screen flex flex-col">
      {!isWebDesignPage && !isThankYouPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogArchive />} />
          <Route path="/blog/:slug" element={<BlogPostWrapper />} />
          <Route path="/web-design" element={<WebDesignPage />} />
          <Route path="/web-design/questionnaire" element={<QuestionnairePage />} />
          <Route path="/web-design/booking" element={<BookingPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </main>
      {!isWebDesignPage && !isThankYouPage && (
        <Newsletter
          locationId={import.meta.env.VITE_GHL_LOCATION_ID}
          apiKey={import.meta.env.VITE_GHL_API_KEY}
          variant="minimal"
        />
      )}
      {!isWebDesignPage && !isThankYouPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <GoogleTagManager />
      <AppContent />
    </Router>
  );
};

// Wrapper component to handle slug parameter
const BlogPostWrapper = () => {
  const slug = window.location.pathname.split("/blog/")[1];
  return <BlogPost slug={slug} />;
};

export default App;