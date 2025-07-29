import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { gameQuotes } from '../../utils/quotes';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;

  const rawKey = path === '/' ? 'main' : path.slice(1);
  const gameKey = gameQuotes[rawKey] ? rawKey : 'main';

  const footerText = useMemo(() => {
    const quotes = gameQuotes[gameKey];
    if (Array.isArray(quotes)) {
      const index = Math.floor(Math.random() * quotes.length);
      return quotes[index];
    }
    return quotes;
  }, [gameKey]);

  return (
    <div className="footer">
      <p className="footer__info">Built by Jason Cox | 2025</p>
      <p className="footer__easteregg">{footerText}</p>
    </div>
  );
};

export default Footer;
