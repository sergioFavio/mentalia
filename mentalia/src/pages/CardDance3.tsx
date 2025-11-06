import React from 'react';

interface CardData {
  index: number;
  colorCard: string;
  image?: string;
}

interface CardDanceProps {
  cards?: CardData[];
  width?: number;
  height?: number;
  rotationDuration?: number;
}

// Función para generar una imagen SVG como data URL (fallback si no se proporciona imagen)
const generateSVGImage = (index: number, color: string): string => {
  const [r, g, b] = color.split(',').map(n => parseInt(n.trim()));
  const darkerR = Math.max(0, r - 50);
  const darkerG = Math.max(0, g - 50);
  const darkerB = Math.max(0, b - 50);
  
  const patterns = [
    `<circle cx="200" cy="150" r="100" fill="rgba(255,255,255,0.2)"/>
     <circle cx="200" cy="300" r="80" fill="rgba(255,255,255,0.15)"/>
     <circle cx="200" cy="450" r="120" fill="rgba(255,255,255,0.1)"/>`,
    
    `<rect x="0" y="50" width="400" height="40" fill="rgba(255,255,255,0.2)"/>
     <rect x="0" y="150" width="400" height="60" fill="rgba(255,255,255,0.15)"/>
     <rect x="0" y="270" width="400" height="50" fill="rgba(255,255,255,0.1)"/>
     <rect x="0" y="380" width="400" height="70" fill="rgba(255,255,255,0.2)"/>`,
    
    `<polygon points="200,50 350,250 50,250" fill="rgba(255,255,255,0.2)"/>
     <polygon points="200,350 350,550 50,550" fill="rgba(255,255,255,0.15)"/>`,
    
    `<path d="M0,200 Q100,100 200,200 T400,200" stroke="rgba(255,255,255,0.3)" stroke-width="20" fill="none"/>
     <path d="M0,300 Q100,200 200,300 T400,300" stroke="rgba(255,255,255,0.2)" stroke-width="20" fill="none"/>
     <path d="M0,400 Q100,300 200,400 T400,400" stroke="rgba(255,255,255,0.15)" stroke-width="20" fill="none"/>`,
    
    `<line x1="100" y1="0" x2="100" y2="600" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
     <line x1="200" y1="0" x2="200" y2="600" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
     <line x1="300" y1="0" x2="300" y2="600" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
     <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
     <line x1="0" y1="300" x2="400" y2="300" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
     <line x1="0" y1="450" x2="400" y2="450" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>`,
    
    `<polygon points="200,50 220,120 290,120 230,160 250,230 200,190 150,230 170,160 110,120 180,120" fill="rgba(255,255,255,0.3)"/>
     <polygon points="100,350 115,400 165,400 125,430 140,480 100,450 60,480 75,430 35,400 85,400" fill="rgba(255,255,255,0.2)"/>
     <polygon points="300,400 315,450 365,450 325,480 340,530 300,500 260,530 275,480 235,450 285,450" fill="rgba(255,255,255,0.2)"/>`,
    
    `<polygon points="200,100 250,130 250,190 200,220 150,190 150,130" fill="rgba(255,255,255,0.2)"/>
     <polygon points="200,280 250,310 250,370 200,400 150,370 150,310" fill="rgba(255,255,255,0.15)"/>
     <polygon points="200,460 250,490 250,550 200,580 150,550 150,490" fill="rgba(255,255,255,0.1)"/>`,
    
    `<path d="M200,300 Q200,200 300,200 Q400,200 400,300 Q400,400 300,400 Q200,400 200,300 Q200,250 250,250" 
           stroke="rgba(255,255,255,0.3)" stroke-width="15" fill="none"/>`,
    
    `<polygon points="200,50 300,200 200,350 100,200" fill="rgba(255,255,255,0.2)"/>
     <polygon points="200,350 300,500 200,650 100,500" fill="rgba(255,255,255,0.15)" transform="translate(0,-100)"/>`,
    
    `<circle cx="200" cy="200" r="60" fill="rgba(255,255,255,0.1)"/>
     <circle cx="160" cy="200" r="40" fill="rgba(255,255,255,0.2)"/>
     <circle cx="240" cy="200" r="40" fill="rgba(255,255,255,0.2)"/>
     <circle cx="200" cy="160" r="40" fill="rgba(255,255,255,0.2)"/>
     <circle cx="200" cy="240" r="40" fill="rgba(255,255,255,0.2)"/>
     <circle cx="200" cy="400" r="60" fill="rgba(255,255,255,0.1)"/>
     <circle cx="160" cy="400" r="40" fill="rgba(255,255,255,0.2)"/>
     <circle cx="240" cy="400" r="40" fill="rgba(255,255,255,0.2)"/>
     <circle cx="200" cy="360" r="40" fill="rgba(255,255,255,0.2)"/>
     <circle cx="200" cy="440" r="40" fill="rgba(255,255,255,0.2)"/>`
  ];
  
  const pattern = patterns[index % patterns.length];
  
  const svg = `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${r},${g},${b});stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(${darkerR},${darkerG},${darkerB});stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="600" fill="url(#grad${index})"/>
      ${pattern}
      <text x="200" y="320" font-family="Arial" font-size="80" font-weight="bold" 
            fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">
        ${index + 1}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const CardDance: React.FC<CardDanceProps> = ({
  cards: propCards,
  width = 100,
  height = 150,
  rotationDuration = 20
}) => {
  // Tarjetas por defecto con imágenes SVG generadas
  const defaultCards: CardData[] = [
    { index: 0, colorCard: '142, 249, 252' },
    { index: 1, colorCard: '142, 252, 204' },
    { index: 2, colorCard: '142, 252, 157' },
    { index: 3, colorCard: '215, 252, 142' },
    { index: 4, colorCard: '252, 252, 142' },
    { index: 5, colorCard: '252, 208, 142' },
    { index: 6, colorCard: '252, 142, 142' },
    { index: 7, colorCard: '252, 142, 239' },
    { index: 8, colorCard: '204, 142, 252' },
    { index: 9, colorCard: '142, 202, 252' }
  ].map(card => ({
    ...card,
    image: generateSVGImage(card.index, card.colorCard)
  }));

  // Si el usuario proporciona sus propias tarjetas, úsalas; si no, usa las por defecto
  const cards = propCards || defaultCards;

  const quantity = cards.length;
  const translateZ = width + height;

  return (
    <div className="w-full h-screen relative text-center flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <style>{`
        @keyframes rotating {
          from {
            transform: perspective(1000px) rotateX(-15deg) rotateY(0);
          }
          to {
            transform: perspective(1000px) rotateX(-15deg) rotateY(1turn);
          }
        }
        
        .card-dance-inner {
          animation: rotating ${rotationDuration}s linear infinite;
        }

        .card-item {
          position: absolute;
          width: ${width}px;
          height: ${height}px;
          border-radius: 12px;
          overflow: hidden;
          backface-visibility: visible;
        }

        .card-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
      
      <div
        className="card-dance-inner absolute top-1/4 z-10"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: `calc(50% - ${width / 2}px - 2.5px)`,
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px)'
        }}
      >
        {cards.map((card) => (
          <div
            key={card.index}
            className="card-item"
            style={{
              border: `3px solid rgba(${card.colorCard}, 0.9)`,
              transform: `rotateY(${(360 / quantity) * card.index}deg) translateZ(${translateZ}px)`,
              boxShadow: `0 0 20px rgba(${card.colorCard}, 0.5)`
            }}
          >
            <img
              src={card.image}
              alt={`Card ${card.index + 1}`}
            />
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-80 bg-black bg-opacity-60 px-6 py-3 rounded-lg max-w-3xl">
        <p className="font-bold mb-2">📸 Cómo usar tus propias imágenes PNG/JPG:</p>
        <code className="block bg-gray-900 p-3 rounded text-left overflow-x-auto whitespace-pre">
{`<CardDance 
  cards={[
    { index: 0, colorCard: '142, 249, 252', image: 'http://localhost:5173/src/asset/ai_model.png' },
    { index: 1, colorCard: '142, 252, 204', image: '/imagenes/foto2.jpg' },
    { index: 2, colorCard: '255, 100, 100', image: 'https://url.com/foto3.png' }
  ]}
  width={150}
  height={200}
  rotationDuration={15}
/>`}
        </code>
      </div>
    </div>
  );
};

export default CardDance;