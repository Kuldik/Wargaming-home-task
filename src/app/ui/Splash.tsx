import { useEffect, useState } from 'react';

export const Splash = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem('splash_seen');
    if (seen) { setVisible(false); return; }
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('splash_seen', '1');
    }, 2000); // 2 секунды
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="splash">
      <img src="/images/logo.png" alt="WoW Ships" />
    </div>
  );
};
