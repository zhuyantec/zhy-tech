import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslation } from 'next-i18next';

const Testimonials = () => {
  const { t } = useTranslation('home');

  const testimonialIds = [1, 2, 3];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  ]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <div className="px-4">
      <div className="container mx-auto max-w-[900px] min-h-[550px] p-10 md:p-16 flex flex-col justify-center items-center text-center">
        {/* Section Header */} 
        <p className="text-lg md:text-xl font-semibold text-[var(--primary)] tracking-[.05em] font-[Poppins] mb-4">
          {t('testimonialsSection.subtitle', { defaultValue: '客户评价'})}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-[Poppins] mb-8">
          {t('testimonialsSection.title', { defaultValue: '听听客户怎么说？'})}
        </h2>

        {/* Embla Carousel Structure */}
        <div className="overflow-hidden w-full mb-8" ref={emblaRef}>
          <div className="flex">
            {testimonialIds.map((id) => (
              <div className="flex-grow-0 flex-shrink-0 basis-full min-w-0 px-4" key={id}>
                {/* Testimonial Content */}
                <div className="mb-8">
                    <p className="text-lg md:text-xl text-black font-[Asap] leading-relaxed italic mb-6 max-w-2xl mx-auto">
                        {/* Example default values, replace with actual default quotes in t() */}
                        &quot;{t(`testimonialsSection.items.${id}.quote`, { defaultValue: `Quote from customer ${id}` })}&quot;
                    </p>
                    <p className="text-xl md:text-2xl font-semibold text-black font-[Poppins]">
                        {t(`testimonialsSection.items.${id}.name`, { defaultValue: `Customer ${id} Name` })}
                    </p>
                    <p className="text-base md:text-lg text-gray-600 font-light font-[Poppins]">
                        {t(`testimonialsSection.items.${id}.location`, { defaultValue: `Customer ${id} Location` })}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <button 
              id={`carousel-dot-${index}`}
              aria-label={`Carousel dot ${index + 1}`}
              key={index} 
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === selectedIndex ? 'bg-[var(--primary)]' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 