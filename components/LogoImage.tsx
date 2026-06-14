'use client';

import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
};

export default function LogoImage({ className, style, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = r * 0.299 + g * 0.587 + b * 0.114;
        const saturation = Math.max(r, g, b) - Math.min(r, g, b);

        // 明るくて低彩度（白〜グレー）を透明に
        if (brightness > 160 && saturation < 55) {
          // グラデーション的に透明化
          const alpha = Math.max(0, Math.min(255,
            saturation > 20
              ? 255 * (saturation - 20) / 35  // 彩度20〜55の間でフェード
              : 0
          ));
          data[i + 3] = Math.min(data[i + 3], alpha);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
    img.src = '/logo.png';
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width, height, objectFit: 'contain', ...style }}
    />
  );
}
