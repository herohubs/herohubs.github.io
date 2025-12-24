import React, { useState, useEffect } from 'react';
interface CookieBannerProps {
  lang?: string;
  config?: any;
  i18n?: any;
}

const CookieBanner = ({ lang = 'en', config, i18n }: CookieBannerProps) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
  };

  const cookiPolicyUrl = `/${lang}/cookie-policy`;

  if (!showBanner) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-body text-white py-12 px-5 z-50 border-t border-gray-700">
      <div className="container mx-auto flex flex-row justify-center items-center space-x-4">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <p className="text-sm">
            {config?.cookie?.bannerMessage1 || 'This website uses cookies to enhance the user experience.'}
          </p>
          <p className="text-sm">
            {config?.cookie?.bannerMessage2 || 'By accepting, you consent to the use of cookies.'}
          </p>
          <p className="text-sm">
            {config?.cookie?.bannerMessage3 || 'For more information, please read our'}&nbsp;
            <a href={cookiPolicyUrl} className="text-sm underline text-secondary hover:text-blue-100">
              {i18n.cookie_policy}
            </a>
            .
          </p>
        </div>
        <button
          onClick={acceptCookies}
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex-shrink-0"
        >
          {i18n?.accept_cookies || 'Accept'}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
