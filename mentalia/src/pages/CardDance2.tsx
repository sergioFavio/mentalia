import React from 'react';
import therapyImage from '../asset/card-dance/therapy.jpg';
import breathingImage from '../asset/card-dance/breathing.jpg';
import socialSupportImage from '../asset/card-dance/social-support.jpg';
import journalingImage from '../asset/card-dance/journaling.jpg';
import brainWellbeingImage from '../asset/card-dance/brain-wellbeing.jpg';
import restImage from '../asset/card-dance/rest.jpg';
import exerciseImage from '../asset/card-dance/exercise.jpg';
import natureImage from '../asset/card-dance/nature.jpg';
import appSupportImage from '../asset/card-dance/app-support.jpg';
import recoveryImage from '../asset/card-dance/recovery.jpg';

interface CardData {
  index: number;
  colorCard: string;
  image?: string;
  label?: string;
}

interface CardDanceProps {
  cards?: CardData[];
  width?: number;
  height?: number;
  rotationDuration?: number;
}

const CardDance: React.FC<CardDanceProps> = ({
  cards = [
    { index: 0, colorCard: '142, 249, 252', image: therapyImage, label: 'Terapia' },
    { index: 1, colorCard: '142, 252, 204', image: breathingImage, label: 'Respiracion' },
    { index: 2, colorCard: '142, 252, 157', image: socialSupportImage, label: 'Apoyo social' },
    { index: 3, colorCard: '215, 252, 142', image: journalingImage, label: 'Journaling' },
    { index: 4, colorCard: '252, 252, 142', image: brainWellbeingImage, label: 'Bienestar cerebral' },
    { index: 5, colorCard: '252, 208, 142', image: restImage, label: 'Descanso' },
    { index: 6, colorCard: '252, 142, 142', image: exerciseImage, label: 'Ejercicio' },
    { index: 7, colorCard: '252, 142, 239', image: natureImage, label: 'Naturaleza' },
    { index: 8, colorCard: '204, 142, 252', image: appSupportImage, label: 'App de apoyo' },
    { index: 9, colorCard: '142, 202, 252', image: recoveryImage, label: 'Recuperacion' }
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
                alt={card.label || `Card ${card.index + 1}`}
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
            {card.label && (
              <div className="absolute inset-x-0 bottom-0 bg-black/65 px-2 py-1 text-center text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
                {card.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDance;