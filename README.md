<!-- assets/hero.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 360" width="1000" height="360" role="img" aria-label="LaravelGPT - Script Coder">
  <defs>
    <linearGradient id="lg" x1="0" x2="1">
      <stop offset="0%" stop-color="#6a11cb"/>
      <stop offset="50%" stop-color="#ff6b6b"/>
      <stop offset="100%" stop-color="#ff9f43"/>
    </linearGradient>
    <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#000" flood-opacity="0.18"/>
    </filter>
    <style>
      .rotate { transform-origin: 50% 50%; animation: rotate3d 8s linear infinite; }
      @keyframes rotate3d {
        0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
        50% { transform: rotateX(12deg) rotateY(-14deg) rotateZ(6deg); }
        100% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      }
      .code { font-family: 'Fira Code', 'Source Code Pro', monospace; font-weight:700; }
      .fade-in { opacity:0; animation: appear 1.2s 0.6s forwards; }
      @keyframes appear { to { opacity:1 } }
    </style>
  </defs>

  <!-- background grid -->
  <rect width="100%" height="100%" fill="#071025"/>
  <g opacity="0.06">
    <defs>
      <pattern id="g1" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0 L0 0 0 40" stroke="#ffffff" stroke-width="0.6"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g1)"/>
  </g>

  <!-- 3D card + chip -->
  <g transform="translate(60,40)" class="rotate" filter="url(#softShadow)">
    <g>
      <rect x="0" y="0" rx="18" width="540" height="260" fill="url(#lg)" opacity="0.95"/>

      <!-- inner dark layer -->
      <rect x="22" y="22" rx="12" width="496" height="216" fill="#050614" opacity="0.85"/>

      <!-- chip icon -->
      <g transform="translate(36,36)">
        <rect width="120" height="80" rx="8" fill="#0b1020" stroke="#ffffff" stroke-opacity="0.06"/>
        <rect x="8" y="12" width="104" height="56" rx="6" fill="#111827"/>
        <g transform="translate(14,22)" fill="#8b5cf6">
          <rect width="16" height="28" rx="2" />
          <rect x="22" width="16" height="28" rx="2" />
          <rect x="44" width="66" height="28" rx="2" fill="#ff9f43"/>
        </g>
      </g>

      <!-- code bracket glyphs -->
      <text x="180" y="130" class="code fade-in" font-size="54" fill="#e6eef8">{</text>
      <text x="432" y="130" class="code fade-in" font-size="54" fill="#e6eef8">}</text>

      <!-- title -->
      <text x="180" y="70" font-family="Inter, sans-serif" font-weight="700" font-size="28" fill="#ffffff">MD Shamim Hossain</text>
      <text x="180" y="100" font-family="Inter, sans-serif" font-size="18" fill="#cbd5e1">Script Coder • Full-Stack • AI • Mobile Unlock</text>
    </g>
  </g>

  <!-- small badges / icons on the right -->
  <g transform="translate(650,40)">
    <g transform="translate(0,0)">
      <rect width="300" height="64" rx="12" fill="#071025" stroke="#1f2937"/>
      <text x="92" y="40" font-family="Inter, sans-serif" font-size="16" fill="#e6eef8">Laravel • AI • Mobile Unlock</text>
    </g>
  </g>

</svg>
