import WebDesignHero from './WebDesignHero';
import Footer from '../../Footer';
import { Toaster } from 'react-hot-toast';

export default function WebDesignPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <main className="flex-grow">
        <WebDesignHero />
      </main>
      <Footer />
    </div>
  );
}