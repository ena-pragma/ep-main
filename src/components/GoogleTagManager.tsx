import React from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const GTM_ID = 'GTM-PW8JCLF9';

export const GoogleTagManager: React.FC = () => {
  React.useEffect(() => {
    console.log('Initializing GTM with ID:', GTM_ID);
    if (!window.dataLayer) {
      window.dataLayer = [];
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
};