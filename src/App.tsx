import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <CaseStudies />
    <Contact />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <GoogleTagManager />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogArchive />} />
            <Route path="/blog/:slug" element={<BlogPostWrapper />} />
          </Routes>
        </main>
        <Newsletter
          locationId={import.meta.env.VITE_GHL_LOCATION_ID}
          apiKey={import.meta.env.VITE_GHL_API_KEY}
          variant="minimal"
        />
        <Footer />
      </div>
    </Router>
  );
};

// Wrapper component to handle slug parameter
const BlogPostWrapper = () => {
  const slug = window.location.pathname.split("/blog/")[1];
  return <BlogPost slug={slug} />;
};

export default App;
