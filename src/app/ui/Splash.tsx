import { useEffect, useState } from 'react';
import logoUrl from '../../assets/logo.png'; 

const HIDE_DELAY = 2000;
const ANIM_MS = 450;

export function Splash() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // если уже показывали сплэш в этой сессии — сразу размонтируем
    if (sessionStorage.getItem('splash_seen') === '1') {
      setMounted(false);
      return;
    }

    // помечаем, что показали в этой сессии
    sessionStorage.setItem('splash_seen', '1');

    const t1 = setTimeout(() => setHidden(true), HIDE_DELAY);
    const t2 = setTimeout(() => setMounted(false), HIDE_DELAY + ANIM_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-label="Splash screen"
      className={`splash ${hidden ? 'splash--hide' : ''}`}
    >
      <div className="splash__inner">
        <img src={logoUrl} alt="WoW Ships" className="splash__logo" />
        <div className="splash__hint">Tap to skip</div>
      </div>
    </div>
  );
}
