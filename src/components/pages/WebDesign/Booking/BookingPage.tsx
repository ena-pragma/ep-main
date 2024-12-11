import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function BookingPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Add event listener to handle iframe height
    const handleIframeMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object' && 'frameHeight' in event.data) {
        const iframe = document.getElementById('bookingIframe');
        if (iframe) {
          iframe.style.height = `${event.data.frameHeight}px`;
        }
      }
    };

    window.addEventListener('message', handleIframeMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Schedule Your Web Design Kickoff
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Process payment below to begin creating your perfect website. We will meet to review the project and it will be completed within 2-4 weeks.
          </p>
        </motion.div>

        <div className="relative">
          <iframe 
            id="bookingIframe"
            src="https://api.leadconnectorhq.com/widget/booking/Cxd4Cq0QZVDd7spz22wo" 
            style={{ 
              width: '100%',
              minHeight: '700px',
              border: 'none',
              overflow: 'visible'
            }}
            scrolling="yes"
            title="Booking Calendar"
          />
        </div>
      </div>
    </div>
  );
}