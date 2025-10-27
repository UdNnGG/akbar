
import React, { useState } from 'react';
import type { Comment } from '../types';

interface GuestbookProps {
    comments: Comment[];
    onCommentSubmit: (comment: Comment) => void;
}

export const Guestbook: React.FC<GuestbookProps> = ({ comments, onCommentSubmit }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [attendance, setAttendance] = useState<'Hadir' | 'Tidak Hadir' | 'Masih Ragu'>('Hadir');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name.trim() === '' || message.trim() === '') {
            alert('Nama dan ucapan tidak boleh kosong.');
            return;
        }
        onCommentSubmit({ name, message, attendance, timestamp: new Date() });
        setName('');
        setMessage('');
    };

    return (
        <section className="py-20 px-6 bg-background">
            <h2 className="font-playfair text-4xl md:text-5xl text-text-primary text-center" data-aos="fade-up">Ucapkan Sesuatu</h2>
            <div className="max-w-3xl mx-auto mt-12" data-aos="fade-up" data-aos-delay="200">
                <form onSubmit={handleSubmit} className="bg-white/50 p-8 rounded-lg shadow-md border border-accent/20 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Nama</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                            placeholder="Nama Anda"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-text-secondary">Ucapan & Doa</label>
                        <textarea
                            id="message"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                            placeholder="Tulis ucapan Anda di sini..."
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary">Konfirmasi Kehadiran</label>
                        <div className="mt-2 flex space-x-4">
                           {['Hadir', 'Tidak Hadir', 'Masih Ragu'].map((option) => (
                                <label key={option} className="inline-flex items-center">
                                    <input type="radio" className="form-radio text-accent focus:ring-accent" name="attendance" value={option} checked={attendance === option} onChange={() => setAttendance(option as any)} />
                                    <span className="ml-2 text-text-primary">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-accent text-white py-3 px-6 rounded-lg hover:bg-text-secondary transition-colors">Kirim Ucapan</button>
                </form>

                <div className="mt-12 space-y-6 max-h-96 overflow-y-auto pr-2">
                    {comments.map((comment, index) => (
                        <div key={index} className="bg-white/50 p-4 rounded-lg shadow-sm border-l-4 border-accent">
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-text-primary">{comment.name}</p>
                                <span className={`text-xs px-2 py-1 rounded-full text-white ${
                                    comment.attendance === 'Hadir' ? 'bg-green-500' :
                                    comment.attendance === 'Tidak Hadir' ? 'bg-red-500' : 'bg-gray-500'
                                }`}>{comment.attendance}</span>
                            </div>
                            <p className="text-text-secondary mt-2">{comment.message}</p>
                            <p className="text-right text-xs text-gray-400 mt-2">{comment.timestamp.toLocaleString('id-ID')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
