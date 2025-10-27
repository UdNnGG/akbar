
import React from 'react';
import type { LoveStory } from '../types';

interface LoveStoryItemProps {
  story: LoveStory;
  index: number;
}

export const LoveStoryItem: React.FC<LoveStoryItemProps> = ({ story, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="mb-16 flex flex-col md:flex-row items-center" data-aos="fade-right">
        <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
            <img src={story.imageUrl} alt={story.title} className="rounded-lg shadow-xl w-full object-cover aspect-video md:aspect-square"/>
        </div>
        <div className="w-full md:w-7/12 mt-6 md:mt-0">
             <div className={`relative ${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
                 {/* Timeline Dot */}
                <div className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-accent rounded-full hidden md:block"
                     style={isEven ? { left: '-2px' } : { right: '-2px' }}>
                </div>
                <h3 className="font-playfair text-3xl text-accent">{story.title}</h3>
                <p className="mt-2 text-text-secondary">{story.description}</p>
            </div>
        </div>
    </div>
  );
};
