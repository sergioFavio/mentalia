import React from 'react';

interface CardData {
  index: number;
  colorCard: string;
}

interface CardDanceProps {
  cards?: CardData[];
  width?: number;
  height?: number;
  rotationDuration?: number;
}

const CardDance: React.FC<CardDanceProps> = ({
  cards = [
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
  ],
  width = 100,
  height = 150,
  rotationDuration = 20
}) => {
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
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              border: `2px solid rgba(${card.colorCard})`,
              transform: `rotateY(${(360 / quantity) * card.index}deg) translateZ(${translateZ}px)`
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle, rgba(${card.colorCard}, 0.2) 0%, rgba(${card.colorCard}, 0.6) 80%, rgba(${card.colorCard}, 0.9) 100%)`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDance;