
import React from 'react';

interface AudioPlayerProps {
    isPlaying: boolean;
    onTogglePlay: () => void;
    isVisible: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onTogglePlay, isVisible }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <button
                onClick={onTogglePlay}
                className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-text-secondary transition-transform duration-300 hover:scale-110"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
                {isPlaying ? (
                    <svg className="w-6 h-6 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
};
