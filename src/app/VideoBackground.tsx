import { useEffect, useRef, useState } from 'react';
import { on } from '../shared/lib/bus';

export const VideoBackground = () => {
  const [enabled, setEnabled] = useState(() => localStorage.getItem('video-bg') !== 'off');
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const apply = (onFlag: boolean) => {
      document.documentElement.classList.toggle('with-video', onFlag);
    };
    apply(enabled);

    const unsub = on('video:changed', (e) => {
      const v = (e.detail as 'on' | 'off') ?? (localStorage.getItem('video-bg') === 'off' ? 'off' : 'on');
      const onFlag = v !== 'off';
      setEnabled(onFlag);
      apply(onFlag);
    });

    const storage = (e: StorageEvent) => {
      if (e.key === 'video-bg') {
        const onFlag = e.newValue !== 'off';
        setEnabled(onFlag);
        apply(onFlag);
      }
    };
    window.addEventListener('storage', storage);
    return () => {
      unsub();
      window.removeEventListener('storage', storage);
    };
  }, [enabled]);

  useEffect(() => {
    if (enabled && ref.current) {
      ref.current.muted = true;
      ref.current.play().catch(() => {});
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src="/video/bg.mp4"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};
