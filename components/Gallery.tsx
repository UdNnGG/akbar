
import React, { useState, useRef } from 'react';
import type { GalleryItem } from '../types';

interface GalleryProps {
  images: GalleryItem[];
  onImageClick: (imageUrl: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (touchStartX.current === 0) return;
    if (touchStartX.current - touchEndX.current > 50) { // Swiped left
      nextSlide();
    }
    
    if (touchStartX.current - touchEndX.current < -50) { // Swiped right
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!images || images.length === 0) {
    return null;
  }

  const renderSlide = (item: GalleryItem) => {
    const layout = item.layout || 'overlay';
  
    const captionElement = item.caption ? (
      <div className="w-full h-full flex items-center justify-center p-4 md:p-8 bg-white/50">
        <p className="text-center text-text-primary text-base md:text-lg">{item.caption}</p>
      </div>
    ) : null;
  
    const imageElement = (
      <div className="w-full h-full">
        <img src={item.src} alt={item.caption || 'Gallery image'} className="w-full h-full object-cover" />
      </div>
    );
  
    switch (layout) {
      case 'split-left':
        return (
          <div className="flex flex-col md:flex-row h-full w-full">
            <div className="w-full md:w-1/2 h-1/2 md:h-full">
              {imageElement}
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full">
              {captionElement}
            </div>
          </div>
        );
      case 'split-right':
        return (
          <div className="flex flex-col md:flex-row h-full w-full">
            <div className="w-full md:w-1/2 h-1/2 md:h-full md:order-2">
              {imageElement}
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full md:order-1">
              {captionElement}
            </div>
          </div>
        );
      case 'overlay':
      default:
        return (
          <div className="relative w-full h-full">
            {imageElement}
            {item.caption && (
              <div className="absolute bottom-0 w-full bg-black/50 text-white text-center p-4 backdrop-blur-sm">
                <p>{item.caption}</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 relative group" data-aos="fade-up">
      <div 
        className="relative w-full h-[75vh] rounded-lg bg-background duration-500 cursor-pointer overflow-hidden shadow-lg"
        onClick={() => onImageClick(images[currentIndex].src)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((item, index) => (
            <div key={index} className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                 {renderSlide(item)}
            </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button aria-label="Previous image" onClick={prevSlide} className="opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer hover:bg-black/60 transition-all duration-300 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button aria-label="Next image" onClick={nextSlide} className="opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer hover:bg-black/60 transition-all duration-300 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Thumbnails */}
      <div className="flex justify-center mt-4 space-x-2 overflow-x-auto p-2">
        {images.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={`cursor-pointer flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-4 transition-all ${currentIndex === index ? 'border-accent scale-110' : 'border-transparent opacity-60'}`}
            aria-current={currentIndex === index}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    e.stopPropagation();
                    goToSlide(index);
                }
            }}
          >
            <img src={item.src} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
          </div>
        ))}
      </div>
    </div>
  );
};