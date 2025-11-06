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

const CardDance: React.FC<CardDanceProps> = ({
  cards = [
    { index: 0, colorCard: '142, 249, 252', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400' },
    { index: 1, colorCard: '142, 252, 204', image: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400' },
    { index: 2, colorCard: '142, 252, 157', image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400' },
    { index: 3, colorCard: '215, 252, 142', image: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=400' },
    { index: 4, colorCard: '252, 252, 142', image: 'https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=400' },
    { index: 5, colorCard: '252, 208, 142', image: 'https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=400' },
    { index: 6, colorCard: '252, 142, 142', image: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400' },
    { index: 7, colorCard: '252, 142, 239', image: 'https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=400' },
    { index: 8, colorCard: '204, 142, 252', image: 'https://images.unsplash.com/photo-1682687221363-72518513620e?w=400' },
    { index: 9, colorCard: '142, 202, 252', image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=400' }
  ],
  width = 125,
  height = 187.5,
  rotationDuration = 20
}) => {
  const quantity = cards.length;
  const translateZ = width + height;

  return (
    <div className="w-full h-screen relative text-center flex items-center justify-center overflow-hidden bg-transparent">
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
            {card.image ? (
              <img
                src={card.image}
                alt={`Card ${card.index + 1}`}
                className="w-full h-full object-cover"
                style={{
                  background: `radial-gradient(circle, rgba(${card.colorCard}, 0.2) 0%, rgba(${card.colorCard}, 0.6) 80%, rgba(${card.colorCard}, 0.9) 100%)`
                }}
              />
            ) : (
              <div
                className="w-full h-full"
                style={{
                  background: `radial-gradient(circle, rgba(${card.colorCard}, 0.2) 0%, rgba(${card.colorCard}, 0.6) 80%, rgba(${card.colorCard}, 0.9) 100%)`
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDance;