"use client"
import Image from 'next/image'
import ImgOrange from '@/public/orange.jpg'
import ImgBike from '@/public/bike.jpg'
import ImgShoes from '@/public/shoes.jpg'
import { useEffect, useState } from 'react';
import styles from '@/public/css/carousel.module.css';

export default function Carousel() {
  const image = [
    "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/5/3/eb4a3b1b-7199-45f9-922b-0da7a0deac9b.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/5/2/230c7403-25aa-4c1a-97f9-444734361e1b.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/5/2/d3308894-79be-477b-bee5-9ef2a3ff289e.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/5/2/b22db159-28a2-4179-8f9c-a9351ff4898f.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/5/3/9f9a5a43-0185-4e40-a87e-042c414ac946.jpg.webp?ect=4g"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextSlide = (currentSlide + 1) % image.length;
      setCurrentSlide(nextSlide);
    }, 5000); // Change slide duration

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleIndicatorClick = (index: any) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container flex-row items-center w-auto gap-2 wrapperflex">
      <div className="w-full h-[100px] md:h-[300px] my-5 overflow-hidden rounded md:rounded-xl">
        <div className="flex duration-700 ease-linear transform " style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {image.map((image, index) => (
            <Image key={index} src={image} width={2000} height={2000} alt={`Slide ${index}`} className='min-w-full h-[100px] md:h-[300px] object-cover ' />
          ))}
        </div>
        <div className='flex justify-between min-w-full px-5 -translate-y-8'>
          <div>
            {image.map((_, index) => (
              <button
                key={index}
                className={`w-[8px] h-[8px] bg-[#ffffff70] border-0 rounded-full mx-1 cursor-pointer ${index === currentSlide ? 'bg-white' : ''}`}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </div>
          <button className='text-xs bg-[#212121] text-white px-2 rounded'>Lihat Promo Lainnya</button>
        </div>
      </div>
    </div>
  )
}