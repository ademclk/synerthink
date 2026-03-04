import { useEffect, useMemo, useState } from "react";

interface ScalableGradientBlurProps {
  seed: string;
  className?: string;
  opacity?: number;
  versionLabel?: string;
}

// ─── PRNG ────────────────────────────────────────────────────────────────────
function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a |= 0; b |= 0; c |= 0; d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function cyrb128(str: string) {
  let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

// ─── Rich green palette ─────────────────────────────────────────────────────
const COLORS = [
  [5, 46, 22],     // Green 950
  [6, 78, 59],     // Emerald 900
  [6, 95, 70],     // Emerald 800
  [4, 120, 87],    // Emerald 700
  [5, 150, 105],   // Emerald 600
  [16, 185, 129],  // Emerald 500
  [52, 211, 153],  // Emerald 400
  [110, 231, 183], // Emerald 300
  [22, 163, 74],   // Green 600
  [34, 197, 94],   // Green 500
  [74, 222, 128],  // Green 400
  [22, 101, 52],   // Green 800
  [20, 83, 45],    // Green 900
  [167, 243, 208], // Emerald 200 — bright accent
  [190, 242, 100], // Lime 400 — yellow-green pop
];

/**
 * Render vivid gradient blobs to an offscreen canvas.
 * The blobs are drawn at full sharpness — the frosted-glass blur
 * is handled by a CSS backdrop-filter overlay in the component.
 */
function renderBlobsToDataURL(seed: string, size: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const seedKeys = cyrb128(seed + "dotlanth-blobs-v6");
  const rand = sfc32(seedKeys[0], seedKeys[1], seedKeys[2], seedKeys[3]);
  const pickColor = () => COLORS[Math.floor(rand() * COLORS.length)];

  // Base fill — medium-dark green (not black, so blobs glow against it)
  ctx.fillStyle = "rgb(4, 40, 22)";
  ctx.fillRect(0, 0, size, size);

  // Pass 1 — large background blobs (wide, soft)
  const bgBlobs = 5 + Math.floor(rand() * 3);
  for (let i = 0; i < bgBlobs; i++) {
    const [r, g, b] = pickColor();
    const cx = rand() * size;
    const cy = rand() * size;
    const radius = (0.4 + rand() * 0.5) * size;
    const alpha = 0.35 + rand() * 0.3;

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
    gradient.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.4})`);
    gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  // Pass 2 — medium vivid blobs for colour richness
  const midBlobs = 4 + Math.floor(rand() * 3);
  for (let i = 0; i < midBlobs; i++) {
    const [r, g, b] = pickColor();
    const cx = rand() * size;
    const cy = rand() * size;
    const radius = (0.2 + rand() * 0.35) * size;
    const alpha = 0.3 + rand() * 0.3;

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
    gradient.addColorStop(0.6, `rgba(${r},${g},${b},${alpha * 0.2})`);
    gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  // Pass 3 — small bright accent highlights
  const accents = 3 + Math.floor(rand() * 2);
  for (let i = 0; i < accents; i++) {
    const [r, g, b] = pickColor();
    const cx = rand() * size;
    const cy = rand() * size;
    const radius = (0.1 + rand() * 0.2) * size;

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
    gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  // Light canvas-level softening (1 pass, not too heavy —
  // the real blur comes from backdrop-filter in CSS)
  const small = 128;
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = small;
  tmpCanvas.height = small;
  const tmpCtx = tmpCanvas.getContext("2d")!;
  tmpCtx.drawImage(canvas, 0, 0, small, small);
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(tmpCanvas, 0, 0, size, size);

  return canvas.toDataURL("image/png");
}

export default function ScalableGradientBlur({
  seed,
  className = "",
  opacity = 1,
  versionLabel,
}: ScalableGradientBlurProps) {
  const [dataURL, setDataURL] = useState<string | null>(null);
  const renderSize = 1024;

  const stableSeed = useMemo(() => seed, [seed]);

  useEffect(() => {
    const url = renderBlobsToDataURL(stableSeed, renderSize);
    setDataURL(url);
  }, [stableSeed, renderSize]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* Layer 1: the vivid gradient blob image */}
      {dataURL ? (
        <img
          src={dataURL}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 bg-[#042816]" />
      )}

      {/* Layer 2: frosted-glass backdrop blur — sits on top of the blobs */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(80px) saturate(1.05)",
          WebkitBackdropFilter: "blur(80px) saturate(1.05)",
        }}
      />

      {/* Version label — on top of everything */}
      {versionLabel && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span
            className="font-bold tracking-tight text-white drop-shadow-xl"
            style={{
              fontSize: "clamp(20px, 6cqw, 56px)",
              textShadow: "0 2px 24px rgba(0,0,0,0.3)",
            }}
          >
            {versionLabel}
          </span>
        </div>
      )}
    </div>
  );
}
