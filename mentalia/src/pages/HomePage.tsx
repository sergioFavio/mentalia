import Robot from "../asset/ai_model.png";
import Cielo2 from "../asset/Variant2.png";
import Cielo1 from "../asset/Default.png";
import FooterInfo from "../component/home/FooterInfo";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [currentSky, setCurrentSky] = useState(0);
  const skyImages = [Cielo1, Cielo2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSky((prev) => (prev + 1) % 2);
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center p-20">
        <h1 className="text-white text-[56px] leading-snug">
          La IA revoluciona el bienestar emocional, en la detección oportuna de crisis
        </h1>
      </div>
      <div className="w-full h-full">
        <div className="relative h-[100%] w-fit flex items-center justify-center isolate">
          {skyImages.map((sky, index) => (
            <img
              key={index}
              src={sky}
              className={`absolute w-[100%] h-[60%] mb-28 ml-28 transition-opacity duration-1000 ${
                currentSky === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <img src={Robot} className="h-[80%] w-auto z-10" />
        </div>
      </div>

    </>
  );
};

export default HomePage;
