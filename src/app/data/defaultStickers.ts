export interface Sticker {
  id: string;
  name: string;
  image: string; // data URI (SVG or base64)
  category: 'memes' | 'reactions' | 'viral' | 'custom';
  tags: string[];
  createdAt: number;
  packName?: string;
  isCustom?: boolean;
  author?: string;
}

// Helper to convert clean SVG string to data URI
function svgToUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const defaultStickers: Sticker[] = [
  // ================= MEMES CLÁSSICOS =================
  {
    id: 'sticker-flork-olhando',
    name: 'Flork Tô Só Olhando',
    category: 'memes',
    packName: 'Memes Clássicos BR',
    tags: ['flork', 'olhando', 'meme', 'observando', 'cafe', 'deboche'],
    createdAt: 1700000001,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <!-- White Sticker Die-Cut Outline -->
        <g filter="url(#shadow)">
          <path d="M 60,195 C 40,195 30,170 35,130 C 40,90 50,45 100,40 C 150,35 175,70 170,120 C 168,145 175,170 185,195 Z" fill="#ffffff" stroke="#ffffff" stroke-width="14" stroke-linejoin="round"/>
          <circle cx="165" cy="155" r="28" fill="#ffffff"/>
        </g>
        <!-- Flork Body -->
        <path d="M 65,195 C 45,195 40,135 45,100 C 52,60 80,50 110,50 C 145,50 162,75 160,125 C 158,155 162,175 170,195 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
        <!-- Eyes -->
        <circle cx="85" cy="85" r="6" fill="#0f172a"/>
        <circle cx="120" cy="82" r="6" fill="#0f172a"/>
        <!-- Neutral line mouth -->
        <path d="M 90,105 Q 102,108 116,104" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
        <!-- Arm holding mug -->
        <path d="M 125,125 Q 145,140 155,145" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
        <!-- Coffee Mug -->
        <rect x="145" y="130" width="30" height="34" rx="6" fill="#ef4444" stroke="#1e293b" stroke-width="4"/>
        <path d="M 175,138 C 185,138 185,156 175,156" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <!-- Coffee Steam -->
        <path d="M 152,122 Q 155,115 152,108" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <path d="M 164,124 Q 167,117 164,110" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <!-- Sticker Tag / Caption -->
        <g transform="translate(110, 205)">
          <rect x="-65" y="-14" width="130" height="24" rx="8" fill="#0f172a"/>
          <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="11">TÔ SÓ DE OLHO 👀</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-nazare-confusa',
    name: 'Nazaré Confusa',
    category: 'memes',
    packName: 'Memes Clássicos BR',
    tags: ['nazare', 'confusa', 'calculos', 'matematica', 'meme', 'oque'],
    createdAt: 1700000002,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <!-- Die-cut outline -->
        <circle cx="110" cy="110" r="92" fill="#ffffff" filter="url(#glow)"/>
        <!-- Background circle -->
        <circle cx="110" cy="110" r="82" fill="#fef08a"/>
        <!-- Blonde Hair -->
        <path d="M 50,130 C 40,80 65,40 110,40 C 155,40 180,80 170,130 C 180,150 170,180 160,180 C 145,170 145,160 140,150 C 80,150 75,170 60,180 C 50,175 40,150 50,130 Z" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        <!-- Face -->
        <circle cx="110" cy="115" r="48" fill="#fed7aa" stroke="#fb923c" stroke-width="3"/>
        <!-- Eyes looking up confused -->
        <ellipse cx="94" cy="108" rx="8" ry="7" fill="#ffffff" stroke="#78350f" stroke-width="2"/>
        <circle cx="96" cy="104" r="4" fill="#0f172a"/>
        <ellipse cx="126" cy="108" rx="8" ry="7" fill="#ffffff" stroke="#78350f" stroke-width="2"/>
        <circle cx="128" cy="104" r="4" fill="#0f172a"/>
        <!-- Eyebrows skewed -->
        <path d="M 85,96 Q 95,92 105,98" fill="none" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
        <path d="M 115,98 Q 125,92 135,96" fill="none" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
        <!-- Confused mouth wavy -->
        <path d="M 98,135 Q 110,130 115,138 Q 122,142 126,135" fill="none" stroke="#b91c1c" stroke-width="4" stroke-linecap="round"/>
        <!-- Math Formulas Floating -->
        <text x="35" y="70" fill="#2563eb" font-family="monospace" font-weight="bold" font-size="14">√x² + y</text>
        <text x="145" y="65" fill="#dc2626" font-family="monospace" font-weight="bold" font-size="14">∫ e^x dx</text>
        <text x="30" y="150" fill="#7c3aed" font-family="monospace" font-weight="bold" font-size="13">sin(α) = ?</text>
        <text x="150" y="150" fill="#059669" font-family="monospace" font-weight="bold" font-size="13">π ≈ 3.14</text>
        <text x="100" y="32" fill="#d97706" font-family="system-ui, sans-serif" font-weight="900" font-size="20">???</text>
        <!-- Bottom Banner -->
        <g transform="translate(110, 195)">
          <rect x="-60" y="-12" width="120" height="22" rx="6" fill="#b45309"/>
          <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="10">NAZARÉ CONFUSA</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-capivara-zen',
    name: 'Capivara Zen',
    category: 'memes',
    packName: 'Memes Clássicos BR',
    tags: ['capivara', 'zen', 'relax', 'paz', 'animal', 'calma'],
    createdAt: 1700000003,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="capishadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <!-- Die-cut white border -->
        <g filter="url(#capishadow)">
          <rect x="25" y="35" width="170" height="155" rx="55" fill="#ffffff"/>
        </g>
        <!-- Body / Head -->
        <ellipse cx="110" cy="125" rx="62" ry="52" fill="#92400e" stroke="#451a03" stroke-width="5"/>
        <path d="M 60,110 C 60,85 85,80 130,80 C 160,80 170,95 170,125 C 170,150 150,165 110,165 C 70,165 60,140 60,110 Z" fill="#b45309"/>
        <!-- Snout -->
        <rect x="120" y="105" width="46" height="42" rx="14" fill="#78350f"/>
        <!-- Nose -->
        <ellipse cx="152" cy="120" rx="8" ry="6" fill="#1c1917"/>
        <!-- Closed Peaceful Eye -->
        <path d="M 88,105 Q 98,112 108,105" fill="none" stroke="#1c1917" stroke-width="4" stroke-linecap="round"/>
        <!-- Cute Ear -->
        <circle cx="70" cy="85" r="12" fill="#78350f" stroke="#451a03" stroke-width="4"/>
        <circle cx="70" cy="85" r="6" fill="#b45309"/>
        <!-- Orange/Tangerine on head -->
        <circle cx="108" cy="62" r="18" fill="#f97316" stroke="#c2410c" stroke-width="4"/>
        <path d="M 108,44 Q 112,38 116,40 Q 114,46 108,44" fill="#15803d"/>
        <!-- Zen Sparkles -->
        <text x="40" y="70" fill="#eab308" font-size="18">✨</text>
        <text x="175" y="80" fill="#eab308" font-size="18">✨</text>
        <!-- Bottom Banner -->
        <g transform="translate(110, 195)">
          <rect x="-65" y="-12" width="130" height="22" rx="7" fill="#15803d"/>
          <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="11">TUDO SOB CONTROLE 🍃</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-gato-julgador',
    name: 'Gato Julgador',
    category: 'memes',
    packName: 'Memes Clássicos BR',
    tags: ['gato', 'julgando', 'patetico', 'deboche', 'meme'],
    createdAt: 1700000004,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="catshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <!-- White Die Cut -->
        <g filter="url(#catshadow)">
          <path d="M 50,55 L 75,90 L 145,90 L 170,55 L 180,120 C 185,165 155,185 110,185 C 65,185 35,165 40,120 Z" fill="#ffffff" stroke="#ffffff" stroke-width="12" stroke-linejoin="round"/>
        </g>
        <!-- Head -->
        <path d="M 55,60 L 78,92 L 142,92 L 165,60 L 172,120 C 175,160 150,175 110,175 C 70,175 45,160 48,120 Z" fill="#e2e8f0" stroke="#334155" stroke-width="5" stroke-linejoin="round"/>
        <!-- Inner Ears -->
        <polygon points="62,70 76,92 68,92" fill="#f472b6"/>
        <polygon points="158,70 144,92 152,92" fill="#f472b6"/>
        <!-- Judging Squinting Eyes -->
        <ellipse cx="85" cy="118" rx="14" ry="5" fill="#facc15" stroke="#1e293b" stroke-width="3"/>
        <circle cx="85" cy="118" r="3" fill="#0f172a"/>
        <ellipse cx="135" cy="118" rx="14" ry="5" fill="#facc15" stroke="#1e293b" stroke-width="3"/>
        <circle cx="135" cy="118" r="3" fill="#0f172a"/>
        <!-- Angry Brows -->
        <path d="M 70,110 L 98,114" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <path d="M 150,110 L 122,114" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <!-- Nose & Whiskers -->
        <polygon points="110,128 105,123 115,123" fill="#f43f5e"/>
        <path d="M 60,128 L 95,130 M 60,136 L 95,135" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 160,128 L 125,130 M 160,136 L 125,135" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Disapproving Mouth -->
        <path d="M 104,136 Q 110,134 116,136" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
        <!-- Caption Badge -->
        <g transform="translate(110, 195)">
          <rect x="-55" y="-12" width="110" height="22" rx="7" fill="#0f172a"/>
          <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="11">PATÉTICO 😼</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-doge-wow',
    name: 'Doge Humor',
    category: 'memes',
    packName: 'Memes Clássicos BR',
    tags: ['doge', 'shiba', 'cachorro', 'wow', 'meme'],
    createdAt: 1700000005,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="dogeshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <circle cx="110" cy="110" r="90" fill="#ffffff" filter="url(#dogeshadow)"/>
        <!-- Doge Head -->
        <circle cx="110" cy="115" r="62" fill="#d97706" stroke="#92400e" stroke-width="4"/>
        <!-- Ears -->
        <polygon points="65,75 80,45 100,70" fill="#b45309" stroke="#78350f" stroke-width="3"/>
        <polygon points="155,75 140,45 120,70" fill="#b45309" stroke="#78350f" stroke-width="3"/>
        <!-- Cheeks -->
        <circle cx="90" cy="130" r="28" fill="#fef3c7"/>
        <circle cx="130" cy="130" r="28" fill="#fef3c7"/>
        <!-- Nose -->
        <ellipse cx="110" cy="126" rx="9" ry="7" fill="#1c1917"/>
        <!-- Eyes -->
        <ellipse cx="90" cy="100" rx="9" ry="11" fill="#ffffff" stroke="#78350f" stroke-width="2"/>
        <circle cx="91" cy="98" r="6" fill="#1c1917"/>
        <ellipse cx="130" cy="100" rx="9" ry="11" fill="#ffffff" stroke="#78350f" stroke-width="2"/>
        <circle cx="129" cy="98" r="6" fill="#1c1917"/>
        <!-- Eyebrows wow -->
        <ellipse cx="88" cy="85" rx="6" ry="3" fill="#fde68a"/>
        <ellipse cx="132" cy="85" rx="6" ry="3" fill="#fde68a"/>
        <!-- Meme Floating texts in Comic Style -->
        <text x="25" y="45" fill="#ec4899" font-family="'Comic Sans MS', cursive, sans-serif" font-weight="bold" font-size="13">muito humor</text>
        <text x="145" y="55" fill="#3b82f6" font-family="'Comic Sans MS', cursive, sans-serif" font-weight="bold" font-size="14">tão comédia</text>
        <text x="25" y="180" fill="#10b981" font-family="'Comic Sans MS', cursive, sans-serif" font-weight="bold" font-size="14">nossa rachei</text>
        <text x="160" y="175" fill="#f59e0b" font-family="'Comic Sans MS', cursive, sans-serif" font-weight="bold" font-size="16">uau</text>
      </svg>
    `)
  },
  {
    id: 'sticker-flork-coracao',
    name: 'Flork Amei',
    category: 'memes',
    packName: 'Memes Clássicos BR',
    tags: ['flork', 'coracao', 'amei', 'fofo', 'ironico', 'amor'],
    createdAt: 1700000006,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="florkheart">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <!-- Die-cut outline -->
        <g filter="url(#florkheart)">
          <path d="M 65,190 C 45,190 35,160 40,120 C 45,75 60,45 105,45 C 150,45 165,75 165,120 C 165,160 160,190 145,190 Z" fill="#ffffff" stroke="#ffffff" stroke-width="14" stroke-linejoin="round"/>
          <path d="M 110,135 C 95,115 80,120 75,135 C 68,155 110,185 110,185 C 110,185 152,155 145,135 C 140,120 125,115 110,135 Z" fill="#ffffff" stroke="#ffffff" stroke-width="12"/>
        </g>
        <!-- Body -->
        <path d="M 70,190 C 50,190 42,130 48,100 C 54,60 80,50 108,50 C 140,50 158,70 156,120 C 154,155 158,175 162,190 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
        <!-- Happy Eyes (curved) -->
        <path d="M 75,85 Q 85,75 95,85" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
        <path d="M 115,82 Q 125,72 135,82" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
        <!-- Sweet smile -->
        <path d="M 95,100 Q 105,110 115,100" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
        <!-- Arms holding giant Heart -->
        <path d="M 110,132 C 95,115 80,120 76,135 C 70,152 110,180 110,180 C 110,180 150,152 144,135 C 140,120 125,115 110,132 Z" fill="#ef4444" stroke="#991b1b" stroke-width="4"/>
        <text x="110" y="152" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="11">AMEI ❤️</text>
        <!-- Sparkles -->
        <text x="45" y="65" fill="#f43f5e" font-size="18">💖</text>
        <text x="155" y="70" fill="#f59e0b" font-size="18">✨</text>
      </svg>
    `)
  },

  // ================= REAÇÕES DE HUMOR =================
  {
    id: 'sticker-risada-kkk',
    name: 'Gargalhada KKK',
    category: 'reactions',
    packName: 'Reações de Humor',
    tags: ['risada', 'kkk', 'morri', 'engracado', 'gargalhada', 'chorando'],
    createdAt: 1700000007,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="laughshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.3"/>
          </filter>
        </defs>
        <!-- Die-cut white backing -->
        <g filter="url(#laughshadow)">
          <circle cx="110" cy="110" r="90" fill="#ffffff"/>
        </g>
        <!-- Tilted Laughing Face -->
        <g transform="rotate(-15 110 110)">
          <circle cx="110" cy="110" r="76" fill="#fbbf24" stroke="#d97706" stroke-width="5"/>
          <!-- Closed Laughing Eyes -->
          <path d="M 68,95 L 92,105 L 68,115" fill="none" stroke="#78350f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 152,95 L 128,105 L 152,115" fill="none" stroke="#78350f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Huge Open Mouth -->
          <path d="M 72,125 Q 110,120 148,125 C 145,168 75,168 72,125 Z" fill="#78350f"/>
          <!-- Tongue -->
          <path d="M 92,150 Q 110,135 128,150 Q 110,172 92,150 Z" fill="#f43f5e"/>
          <!-- Upper Teeth -->
          <path d="M 76,126 Q 110,122 144,126 C 140,135 80,135 76,126 Z" fill="#ffffff"/>
          <!-- Water Tears Shooting -->
          <path d="M 60,102 C 30,100 25,120 40,135 C 55,145 68,120 60,102 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
          <path d="M 160,102 C 190,100 195,120 180,135 C 165,145 152,120 160,102 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
        </g>
        <!-- Badge de Texto Humor -->
        <g transform="translate(110, 200)">
          <rect x="-65" y="-13" width="130" height="24" rx="8" fill="#f97316"/>
          <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="12">KKKKKKKKKK 🤣</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-cringe-facepalm',
    name: 'Cringe Facepalm',
    category: 'reactions',
    packName: 'Reações de Humor',
    tags: ['cringe', 'facepalm', 'vergonha', 'socorro', 'reacao'],
    createdAt: 1700000008,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="cringeshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <!-- Die-cut -->
        <circle cx="110" cy="110" r="90" fill="#ffffff" filter="url(#cringeshadow)"/>
        <!-- Face -->
        <circle cx="110" cy="110" r="76" fill="#fde047" stroke="#ca8a04" stroke-width="5"/>
        <!-- Sweat drop -->
        <path d="M 65,75 C 50,85 55,100 65,105 C 75,100 78,85 65,75 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
        <!-- Left eye grimace -->
        <path d="M 75,115 Q 85,105 95,115" fill="none" stroke="#713f12" stroke-width="5" stroke-linecap="round"/>
        <!-- Wavy uneasy mouth -->
        <path d="M 75,145 Q 85,155 95,145 Q 105,135 115,145" fill="none" stroke="#713f12" stroke-width="5" stroke-linecap="round"/>
        <!-- Blushing red circles -->
        <circle cx="75" cy="130" r="10" fill="#f87171" opacity="0.6"/>
        <!-- Hand Facepalm on Right Side -->
        <g transform="translate(115, 80)">
          <path d="M 5,20 C 5,5 30,5 30,30 L 30,65 C 30,75 10,80 5,65 Z" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
          <!-- Fingers -->
          <rect x="-8" y="10" width="12" height="42" rx="6" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
          <rect x="5" y="5" width="12" height="46" rx="6" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
          <rect x="18" y="12" width="12" height="40" rx="6" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
        </g>
        <!-- Banner -->
        <g transform="translate(110, 198)">
          <rect x="-60" y="-12" width="120" height="24" rx="8" fill="#dc2626"/>
          <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="11">CRINGE DEMAIS 🤦</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-deboche-puro',
    name: 'Deboche Puro',
    category: 'reactions',
    packName: 'Reações de Humor',
    tags: ['deboche', 'ironia', 'aham', 'sarcasmo', 'reacao'],
    createdAt: 1700000009,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="debocheshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <circle cx="110" cy="110" r="90" fill="#ffffff" filter="url(#debocheshadow)"/>
        <circle cx="110" cy="110" r="76" fill="#fde047" stroke="#ca8a04" stroke-width="5"/>
        <!-- Side Eye Looking Left -->
        <ellipse cx="80" cy="105" rx="14" ry="12" fill="#ffffff" stroke="#713f12" stroke-width="3"/>
        <circle cx="72" cy="105" r="7" fill="#0f172a"/>
        <ellipse cx="140" cy="105" rx="14" ry="12" fill="#ffffff" stroke="#713f12" stroke-width="3"/>
        <circle cx="132" cy="105" r="7" fill="#0f172a"/>
        <!-- One Eyebrow High, One Low -->
        <path d="M 68,90 Q 80,82 94,88" fill="none" stroke="#713f12" stroke-width="5" stroke-linecap="round"/>
        <path d="M 128,76 Q 142,65 156,76" fill="none" stroke="#713f12" stroke-width="6" stroke-linecap="round"/>
        <!-- Smirk Mouth -->
        <path d="M 90,140 Q 115,142 145,130" fill="none" stroke="#713f12" stroke-width="6" stroke-linecap="round"/>
        <g transform="translate(110, 198)">
          <rect x="-65" y="-12" width="130" height="24" rx="8" fill="#9333ea"/>
          <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="11">AHAM, TÁ BOM... 💅</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-esqueleto-morto',
    name: 'Morri de Rir',
    category: 'reactions',
    packName: 'Reações de Humor',
    tags: ['esqueleto', 'morto', 'caveira', 'morri', 'rir'],
    createdAt: 1700000010,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="skullshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <g filter="url(#skullshadow)">
          <circle cx="110" cy="105" r="80" fill="#ffffff"/>
          <rect x="75" y="130" width="70" height="45" rx="14" fill="#ffffff"/>
        </g>
        <!-- Skull -->
        <circle cx="110" cy="100" r="68" fill="#f8fafc" stroke="#334155" stroke-width="6"/>
        <rect x="80" y="132" width="60" height="38" rx="10" fill="#f8fafc" stroke="#334155" stroke-width="5"/>
        <!-- Big Eye Sockets -->
        <ellipse cx="86" cy="98" rx="16" ry="20" fill="#0f172a"/>
        <ellipse cx="134" cy="98" rx="16" ry="20" fill="#0f172a"/>
        <!-- Tears of laughter in sockets -->
        <circle cx="86" cy="104" r="5" fill="#38bdf8"/>
        <circle cx="134" cy="104" r="5" fill="#38bdf8"/>
        <!-- Nose cavity -->
        <polygon points="110,118 103,130 117,130" fill="#0f172a"/>
        <!-- Teeth -->
        <line x1="95" y1="135" x2="95" y2="165" stroke="#334155" stroke-width="3"/>
        <line x1="110" y1="135" x2="110" y2="165" stroke="#334155" stroke-width="3"/>
        <line x1="125" y1="135" x2="125" y2="165" stroke="#334155" stroke-width="3"/>
        <line x1="82" y1="150" x2="138" y2="150" stroke="#334155" stroke-width="3"/>
        <!-- Banner -->
        <g transform="translate(110, 198)">
          <rect x="-60" y="-12" width="120" height="24" rx="8" fill="#1e293b"/>
          <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="11">MORRI DE RIR 💀</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-calma-calabreso',
    name: 'Calma Calabreso',
    category: 'reactions',
    packName: 'Reações de Humor',
    tags: ['calma', 'calabreso', 'meme', 'br', 'tonho'],
    createdAt: 1700000011,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="calabresoshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <g filter="url(#calabresoshadow)">
          <rect x="25" y="30" width="170" height="160" rx="45" fill="#ffffff"/>
        </g>
        <!-- Sausage Character -->
        <rect x="65" y="55" width="90" height="110" rx="42" fill="#ef4444" stroke="#991b1b" stroke-width="5"/>
        <!-- Chef Hat -->
        <path d="M 85,55 C 75,30 95,20 110,25 C 125,20 145,30 135,55 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="4"/>
        <rect x="85" y="50" width="50" height="12" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>
        <!-- Big Eyes -->
        <circle cx="92" cy="90" r="12" fill="#ffffff" stroke="#991b1b" stroke-width="3"/>
        <circle cx="94" cy="90" r="6" fill="#0f172a"/>
        <circle cx="128" cy="90" r="12" fill="#ffffff" stroke="#991b1b" stroke-width="3"/>
        <circle cx="126" cy="90" r="6" fill="#0f172a"/>
        <!-- Mustache -->
        <path d="M 90,118 Q 110,110 110,122 Q 110,110 130,118 Q 110,132 90,118 Z" fill="#451a03"/>
        <!-- Shouting mouth -->
        <ellipse cx="110" cy="135" rx="14" ry="10" fill="#451a03"/>
        <!-- Banner -->
        <g transform="translate(110, 196)">
          <rect x="-70" y="-13" width="140" height="26" rx="8" fill="#b91c1c"/>
          <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="11">CALMA CALABRESO! 🔥</text>
        </g>
      </svg>
    `)
  },

  // ================= TENDÊNCIAS & VIRAIS =================
  {
    id: 'sticker-capivara-estilosa',
    name: 'Capivara Estilosa',
    category: 'viral',
    packName: 'Virais da Internet',
    tags: ['capivara', 'oculos', 'estilo', 'viral', 'hype'],
    createdAt: 1700000012,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="vshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.3"/>
          </filter>
        </defs>
        <!-- Die-cut white backing -->
        <circle cx="110" cy="110" r="92" fill="#ffffff" filter="url(#vshadow)"/>
        <!-- Glow Circle -->
        <circle cx="110" cy="110" r="80" fill="#0f172a"/>
        <!-- Capivara Head -->
        <ellipse cx="110" cy="118" rx="55" ry="46" fill="#b45309" stroke="#78350f" stroke-width="4"/>
        <rect x="115" y="102" width="40" height="36" rx="12" fill="#78350f"/>
        <!-- Cute Ears -->
        <circle cx="72" cy="85" r="10" fill="#78350f"/>
        <!-- Black Pixel Shades (Thug Life) -->
        <polygon points="70,96 150,96 145,116 115,116 112,106 102,106 98,116 75,116" fill="#000000" stroke="#ffffff" stroke-width="2"/>
        <rect x="80" y="100" width="8" height="4" fill="#ffffff"/>
        <rect x="125" y="100" width="8" height="4" fill="#ffffff"/>
        <!-- Gold Chain -->
        <path d="M 85,150 Q 110,165 135,150" fill="none" stroke="#fbbf24" stroke-width="6" stroke-linecap="round"/>
        <!-- Fire Badge -->
        <g transform="translate(150, 48)">
          <circle cx="18" cy="18" r="16" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
          <text x="18" y="24" text-anchor="middle" fill="#ffffff" font-size="16">🔥</text>
        </g>
        <!-- Caption -->
        <g transform="translate(110, 196)">
          <rect x="-65" y="-12" width="130" height="24" rx="8" fill="#f97316"/>
          <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="11">VIRALIZOU 🔥</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-sigma-mewing',
    name: 'Mewing Chad',
    category: 'viral',
    packName: 'Virais da Internet',
    tags: ['mewing', 'chad', 'sigma', 'byebye', 'viral', 'brainrot'],
    createdAt: 1700000013,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="mewshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <!-- Die-cut -->
        <g filter="url(#mewshadow)">
          <path d="M 60,60 L 160,60 L 155,140 L 110,185 L 65,140 Z" fill="#ffffff" stroke="#ffffff" stroke-width="14" stroke-linejoin="round"/>
        </g>
        <!-- Chiseled Chad Jaw Face -->
        <path d="M 65,65 L 155,65 L 150,135 L 110,178 L 70,135 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="5" stroke-linejoin="round"/>
        <!-- High Cheekbones -->
        <path d="M 72,110 L 95,128 L 78,142" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
        <path d="M 148,110 L 125,128 L 142,142" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
        <!-- Squinting intense eyes -->
        <line x1="80" y1="92" x2="98" y2="92" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
        <line x1="122" y1="92" x2="140" y2="92" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
        <!-- Sharp Nose -->
        <path d="M 110,85 L 105,120 L 115,120" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
        <!-- Finger on lips 🤫 -->
        <rect x="105" y="125" width="12" height="30" rx="5" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
        <!-- Banner -->
        <g transform="translate(110, 198)">
          <rect x="-65" y="-12" width="130" height="24" rx="8" fill="#0f172a"/>
          <text x="0" y="4" text-anchor="middle" fill="#f97316" font-family="system-ui, sans-serif" font-weight="900" font-size="11">🤫 MEWING / CHAD</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-amogus-sus',
    name: 'Amogus Sus',
    category: 'viral',
    packName: 'Virais da Internet',
    tags: ['sus', 'amogus', 'amongus', 'impostor', 'meme'],
    createdAt: 1700000014,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="susshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <g filter="url(#susshadow)">
          <path d="M 70,60 C 70,30 150,30 150,60 L 150,150 L 132,150 L 132,175 L 115,175 L 115,150 L 105,150 L 105,175 L 88,175 L 88,150 L 70,150 Z" fill="#ffffff" stroke="#ffffff" stroke-width="14" stroke-linejoin="round"/>
          <rect x="52" y="80" width="22" height="60" rx="10" fill="#ffffff" stroke="#ffffff" stroke-width="10"/>
        </g>
        <!-- Backpack -->
        <rect x="55" y="82" width="20" height="55" rx="8" fill="#991b1b" stroke="#450a0a" stroke-width="4"/>
        <!-- Crewmate Body -->
        <path d="M 72,62 C 72,35 148,35 148,62 L 148,145 L 130,145 L 130,172 L 114,172 L 114,145 L 106,145 L 106,172 L 90,172 L 90,145 L 72,145 Z" fill="#dc2626" stroke="#450a0a" stroke-width="5" stroke-linejoin="round"/>
        <!-- Visor -->
        <rect x="110" y="65" width="48" height="34" rx="14" fill="#38bdf8" stroke="#0369a1" stroke-width="4"/>
        <!-- Visor Highlight -->
        <path d="M 120,72 Q 138,72 148,78" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
        <!-- Banner -->
        <g transform="translate(110, 198)">
          <rect x="-55" y="-12" width="110" height="24" rx="8" fill="#450a0a"/>
          <text x="0" y="4" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-weight="900" font-size="12">MEIO SUS... 👀</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-selo-cringe',
    name: 'Alerta Cringe Máximo',
    category: 'viral',
    packName: 'Virais da Internet',
    tags: ['cringe', 'selo', 'alerta', 'vergonha'],
    createdAt: 1700000015,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="alertshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
          </filter>
        </defs>
        <!-- Die-cut stamp -->
        <g filter="url(#alertshadow)">
          <rect x="25" y="40" width="170" height="140" rx="20" fill="#ffffff" transform="rotate(-6 110 110)"/>
        </g>
        <g transform="rotate(-6 110 110)">
          <!-- Stamp Border -->
          <rect x="30" y="45" width="160" height="130" rx="16" fill="#fee2e2" stroke="#dc2626" stroke-width="6" stroke-dasharray="8 6"/>
          <!-- Warning Icon -->
          <polygon points="110,65 85,110 135,110" fill="#ef4444"/>
          <text x="110" y="104" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="16">!</text>
          <!-- Stamp Text -->
          <text x="110" y="135" text-anchor="middle" fill="#991b1b" font-family="system-ui, sans-serif" font-weight="900" font-size="17">100% CRINGE</text>
          <text x="110" y="155" text-anchor="middle" fill="#b91c1c" font-family="system-ui, sans-serif" font-weight="700" font-size="11">PERIGO DE VERGONHA</text>
        </g>
      </svg>
    `)
  },
  {
    id: 'sticker-pov-riu',
    name: 'POV: Você Riu',
    category: 'viral',
    packName: 'Virais da Internet',
    tags: ['pov', 'legenda', 'riu', 'trend', 'humor'],
    createdAt: 1700000016,
    image: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <filter id="povshadow">
            <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.3"/>
          </filter>
        </defs>
        <!-- Die-cut outline -->
        <g filter="url(#povshadow)">
          <rect x="20" y="45" width="180" height="130" rx="28" fill="#ffffff"/>
        </g>
        <!-- Translucent dark bubble -->
        <rect x="25" y="50" width="170" height="120" rx="24" fill="#0f172a" stroke="#f97316" stroke-width="3"/>
        <!-- Laugh icon -->
        <circle cx="50" cy="78" r="14" fill="#f97316"/>
        <text x="50" y="83" text-anchor="middle" fill="#ffffff" font-size="14">😂</text>
        <text x="74" y="83" fill="#fb923c" font-family="system-ui, sans-serif" font-weight="900" font-size="13">POV HUMOR</text>
        <!-- White Rounded Subtitle Box -->
        <rect x="38" y="105" width="144" height="48" rx="10" fill="#1e293b"/>
        <text x="110" y="126" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="12">POV: Você perdeu</text>
        <text x="110" y="142" text-anchor="middle" fill="#facc15" font-family="system-ui, sans-serif" font-weight="800" font-size="11">no 1º segundo 💀</text>
      </svg>
    `)
  }
];
