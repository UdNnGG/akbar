
import React from 'react';
import type { Gift } from '../types';

interface GiftCardProps {
    gift: Gift;
    onCopy: (accountNumber: string) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, onCopy }) => {
    return (
        <div className="bg-white/50 p-6 rounded-lg shadow-md border border-accent/20 flex flex-col items-center">
            {gift.logoUrl && <img src={gift.logoUrl} alt={gift.bankName} className="h-10 mb-4 object-contain" />}
            <p className="font-semibold text-text-primary text-xl">{gift.accountNumber}</p>
            <p className="text-text-secondary mt-1">a/n {gift.accountHolder}</p>
            <button 
                onClick={() => onCopy(gift.accountNumber)}
                className="mt-4 bg-transparent border border-accent text-accent py-2 px-5 rounded-full hover:bg-accent hover:text-white transition-colors text-sm"
            >
                Salin Nomor
            </button>
        </div>
    );
};
