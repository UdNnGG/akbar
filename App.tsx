
import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';

// ============================================================================
// TYPE DEFINITIONS (from types.ts)
// ============================================================================
interface Comment {
    name: string;
    message: string;
    attendance: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
    timestamp: Date;
}

interface Person {
    nickname: string;
    fullName: string;
    fatherName: string;
    motherName: string;
}

interface EventDetails {
    name: string;
    date: Date;
    time: string;
    venue: string;
    address: string;
    mapLink: string;
}

interface LoveStory {
    title: string;
    description: string;
    imageUrl: string;
}

interface Gift {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    logoUrl?: string;
}

interface GalleryItem {
  src: string;
  caption: string;
  layout?: 'overlay' | 'split-left' | 'split-right';
}

interface CoverDetails {
  imageUrl: string;
  imagePosition?: string;
}

// ============================================================================
// CONSTANTS (from components/constants.ts)
// ============================================================================
const cover: CoverDetails = {
    imageUrl: 'https://i.imgur.com/7yHF64i.jpeg',
    imagePosition: 'center center',
};

const groom: Person = {
    nickname: 'Agil',
    fullName: 'Agil Adi Saputro',
    fatherName: '[Nama Ayah Mempelai Pria]',
    motherName: '[Nama Ibu Mempelai Pria]',
};

const bride: Person = {
    nickname: '[Wanita]',
    fullName: '[Nama Lengkap Mempelai Wanita]',
    fatherName: '[Nama Ayah Mempelai Wanita]',
    motherName: '[Nama Ibu Mempelai Wanita]',
};

const events: EventDetails[] = [
    {
        name: 'Resepsi',
        date: new Date('2025-12-25T09:00:00'),
        time: 'Pukul : 09:00 WIB - Selesai',
        venue: 'Aula Desa Gunung Putri Selatan',
        address: 'Desa Gunung Putri Selatan',
        mapLink: 'https://maps.app.goo.gl/tYE7qVJJKB6wxNnq6',
    },
];

const loveStories: LoveStory[] = [
    {
        title: 'Awal Cerita',
        description: '[Placeholder untuk cerita awal pertemuan. Deskripsikan bagaimana pasangan ini pertama kali bertemu dan memulai hubungan mereka.]',
        imageUrl: 'https://picsum.photos/800/600?random=1',
    },
    {
        title: 'Lamaran',
        description: '[Placeholder untuk cerita momen lamaran. Deskripsikan suasana dan perasaan saat salah satu pasangan melamar yang lain.]',
        imageUrl: 'https://picsum.photos/800/600?random=2',
    },
    {
        title: 'Pernikahan',
        description: '[Placeholder untuk cerita menuju pernikahan. Deskripsikan persiapan dan harapan menjelang hari bahagia.]',
        imageUrl: 'https://picsum.photos/800/600?random=3',
    },
];

const galleryItems: GalleryItem[] = [
    { src: 'https://i.imgur.com/7yHF64i.jpeg', caption: 'Momen bahagia kami.', layout: 'overlay' },
    { src: 'https://picsum.photos/800/1200?random=11', caption: 'Kenangan yang tak terlupakan.', layout: 'split-left' },
    { src: 'https://picsum.photos/800/1200?random=12', caption: 'Cinta kami bersemi.', layout: 'split-right' },
    { src: 'https://picsum.photos/800/1200?random=16', caption: 'Selalu bersama selamanya.', layout: 'split-right' },
    { src: 'https://picsum.photos/800/1200?random=17', caption: 'Dua hati menjadi satu.', layout: 'split-left' },
];

const gifts: Gift[] = [
    {
        bankName: '[Nama Bank 1]',
        accountNumber: '1234567890',
        accountHolder: '[Nama Pemilik Rekening 1]',
        logoUrl: 'https://picsum.photos/150/50?random=20'
    },
    {
        bankName: '[E-Wallet/Bank 2]',
        accountNumber: '0987654321',
        accountHolder: '[Nama Pemilik Rekening 2]',
        logoUrl: 'https://picsum.photos/150/50?random=21'
    }
];

const physicalGift = {
    name: '[Nama Penerima Hadiah]',
    address: '[Alamat Lengkap untuk Kirim Hadiah Fisik]'
};


// ============================================================================
// COMPONENTS
// ============================================================================

// --- Countdown ---
interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeComponents = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8 my-12" data-aos="fade-up" data-aos-delay="400">
      {timeComponents.map((component, index) => (
        <div key={index} className="flex flex-col items-center justify-center bg-white/50 w-20 h-20 md:w-28 md:h-28 rounded-lg shadow-md border border-accent/20">
          <span className="font-playfair text-3xl md:text-5xl text-accent">{String(component.value).padStart(2, '0')}</span>
          <span className="text-xs md:text-sm text-text-secondary">{component.label}</span>
        </div>
      ))}
    </div>
  );
};

// --- Guestbook ---
interface GuestbookProps {
    comments: Comment[];
    onCommentSubmit: (comment: Comment) => void;
}

const Guestbook: React.FC<GuestbookProps> = ({ comments, onCommentSubmit }) => {
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

// --- AudioPlayer ---
interface AudioPlayerProps {
    isPlaying: boolean;
    onTogglePlay: () => void;
    isVisible: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onTogglePlay, isVisible }) => {
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

// --- Gallery ---
interface GalleryProps {
  images: GalleryItem[];
  onImageClick: (imageUrl: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onImageClick }) => {
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

// --- Lightbox ---
interface LightboxProps {
  imageUrl: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-4xl hover:opacity-75 z-50"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt="Lightbox"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

// --- LoveStoryItem ---
interface LoveStoryItemProps {
  story: LoveStory;
  index: number;
}

const LoveStoryItem: React.FC<LoveStoryItemProps> = ({ story, index }) => {
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

// --- GiftCard ---
interface GiftCardProps {
    gift: Gift;
    onCopy: (accountNumber: string) => void;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, onCopy }) => {
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


// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
const App: React.FC = () => {
    const [isCoverOpen, setCoverOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [isGiftSectionOpen, setIsGiftSectionOpen] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: false,
            mirror: true,
            easing: 'ease-in-out-quad',
        });
    }, []);

    const handleOpenInvitation = () => {
        setCoverOpen(true);
        setIsPlaying(true);
        audioRef.current?.play();
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };
    
    const handleCommentSubmit = (comment: Comment) => {
        setComments([comment, ...comments]);
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('Nomor rekening berhasil disalin!');
        } catch (err) {
            alert('Gagal menyalin nomor rekening.');
        }
    };
    
    return (
        <>
            <div 
                className={`fixed inset-0 bg-background z-50 flex items-center justify-center transition-transform duration-[1.5s] ease-in-out ${isCoverOpen ? '-translate-y-full' : 'translate-y-0'}`}
                style={{ 
                    backgroundImage: `url(${cover.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: cover.imagePosition || 'center center',
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative text-center text-white p-8" data-aos="fade-up">
                    <h2 className="font-playfair text-2xl md:text-3xl">The Wedding of</h2>
                    <h1 className="font-playfair text-6xl md:text-8xl my-4">Agil &amp; Ajizah</h1>
                    <p className="mt-8 text-lg">Kepada Yth.</p>
                    <p className="font-bold text-2xl">[Nama Tamu]</p>
                    <button
                        onClick={handleOpenInvitation}
                        className="mt-8 bg-accent hover:bg-text-secondary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
                    >
                        Buka Undangan
                    </button>
                </div>
            </div>

            <main className={`transition-opacity duration-1000 ${isCoverOpen ? 'opacity-100' : 'opacity-0'}`}>
                {/* Hero Section */}
                <section 
                    className="relative h-screen w-full flex flex-col justify-center items-center text-white text-center bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://i.imgur.com/GKInTr8.jpeg)' }}
                >
                    <div className="absolute inset-0 bg-black/35"></div>
                    <div className="relative z-10 p-9" data-aos="fade-down" data-aos-delay="600">
                        <h2 className="font-playfair text-3xl md:text-4xl">The Wedding of</h2>
                        <h1 className="font-playfair text-7xl md:text-9xl my-4">AGIL &amp; AJIZAH</h1>
                        <p className="text-xl md:text-2xl border-y-2 border-white/50 py-2 inline-block px-4">{events[0].date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '. ')}</p>
                    </div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-pulse-scale">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </section>
                
                {/* Quran Verse Section */}
                <section className="py-20 px-6 text-center bg-background" data-aos="fade-up">
                     <p className="text-3xl text-accent font-playfair mb-4">“</p>
                    <p className="max-w-3xl mx-auto italic text-gray-700 leading-relaxed">"Dan Diantara Tanda-tanda (Kebesaran) -Nya Ialah Dia Menciptakan Pasangan-pasangan Untukmu Dari Jenismu Sendiri, Agar Kamu Cenderung Dan Merasa Tenteram Kepadanya, Dan Dia Menjadikan Diantaramu Rasa Kasih Dan Sayang. Sungguh, Pada Yang Demikian Itu Benar-benar Terdapat Tanda-tanda (Kebesaran Allah) Bagi Kaum Yang Berfikir"</p>
                    <p className="mt-4 font-semibold text-text-primary">(Q.S. Ar-Rum: 21)</p>
                </section>

                {/* Bride & Groom Section */}
                <section className="relative py-20 px-6 text-center bg-cover bg-center" style={{ backgroundImage: 'url(https://i.imgur.com/9egkb7a.jpeg)' }}>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10">
                        <h2 className="font-playfair text-4xl md:text-5xl text-white" data-aos="fade-up">Bride & Groom</h2>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-12">
                           {/* Groom */}
                           <div className="flex flex-col items-center w-60 text-center" data-aos="fade-up">
                               <img src="https://i.imgur.com/qXWWaks.jpeg" alt="Groom" className="w-48 h-64 object-cover rounded-t-full shadow-lg"/>
                               <h3 className="font-playfair text-4xl mt-4 text-white">AGIL</h3>
                               <p className="font-semibold text-lg text-white/90 mt-1">AGIL ADI SAPUTRO</p>
                               <p className="text-white/80 mt-2">Putra Pertama dari</p>
                               <p className="text-white/90">Bapak Sugeng & {groom.motherName}</p>
                           </div>
                           
                           <div className="font-playfair text-6xl text-accent" data-aos="zoom-in" data-aos-delay="100">&</div>

                           {/* Bride */}
                           <div className="flex flex-col items-center w-60 text-center" data-aos="fade-up">
                               <img src="https://i.imgur.com/zfPFc1S.jpeg" alt="Bride" className="w-48 h-64 object-cover rounded-t-full shadow-lg"/>
                               <h3 className="font-playfair text-4xl mt-4 text-white">AJIZAH</h3>
                               <p className="font-semibold text-lg text-white/90 mt-1">SITI AJIZAH</p>
                               <p className="text-white/80 mt-2">Putri Kedua dari</p>
                               <p className="text-white/90">Bapak Ipong & Ibu Leni</p>
                           </div>
                        </div>
                    </div>
                </section>
                
                {/* Event Details & Countdown */}
                <section className="py-20 px-6 text-center bg-background">
                    <h2 className="font-playfair text-4xl md:text-5xl text-text-primary" data-aos="fade-up">Wedding Event</h2>
                    <p className="max-w-2xl mx-auto mt-4 text-text-secondary" data-aos="fade-up" data-aos-delay="200">
                        “Waktu telah membawa kami sampai di titik ini — hari yang kami tunggu dengan penuh doa dan kebahagiaan.”
                    </p>
                    <Countdown targetDate={events[0].date} />
                    
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {events.map((event, index) => (
                            <div key={index} className="bg-white/50 p-8 rounded-lg shadow-md border border-accent/20" data-aos="fade-up" data-aos-delay={index * 200}>
                                <h3 className="font-playfair text-3xl text-accent">{event.name}</h3>
                                <div className="w-20 h-px bg-accent mx-auto my-4"></div>
                                <p className="font-semibold text-lg">{event.date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="text-text-secondary mt-1">{event.time}</p>
                                <p className="text-text-primary font-semibold mt-4">{event.venue}</p>
                                <p className="text-text-secondary mt-1">{event.address}</p>
                                <a href={event.mapLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 bg-accent text-white py-2 px-6 rounded-full hover:bg-text-secondary transition-colors">
                                    Lihat Lokasi
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Love Story Section */}
                <section className="py-20 px-6 bg-background">
                    <h2 className="font-playfair text-4xl md:text-5xl text-text-primary text-center mb-12" data-aos="fade-up">Love Story</h2>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 transform -translate-x-1/2 hidden md:block"></div>
                        {loveStories.map((story, index) => (
                            <LoveStoryItem key={index} story={story} index={index} />
                        ))}
                    </div>
                </section>
                
                {/* Gallery Section */}
                <section className="py-20 bg-background">
                    <h2 className="font-playfair text-4xl md:text-5xl text-text-primary text-center mb-12" data-aos="fade-up">Gallery</h2>
                    <Gallery images={galleryItems} onImageClick={setLightboxImage} />
                </section>
                
                 {/* Gift Section */}
                <section className="py-20 px-6 text-center bg-background bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/1000/800?blur=2)' }}>
                    <h2 className="font-playfair text-4xl md:text-5xl text-text-primary" data-aos="fade-up">Kirim Hadiah</h2>
                    <p className="max-w-2xl mx-auto mt-4 text-text-secondary" data-aos="fade-up" data-aos-delay="200">
                        [Placeholder: Kalimat pembuka untuk bagian hadiah, sebagai pengganti kehadiran.]
                    </p>
                    <button
                        onClick={() => setIsGiftSectionOpen(!isGiftSectionOpen)}
                        className="mt-8 bg-accent hover:bg-text-secondary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg inline-flex items-center gap-2"
                        data-aos="fade-up" data-aos-delay="300"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v2a3 3 0 01-3 3H8a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v2a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H8zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                        Amplop Digital
                    </button>
                    {isGiftSectionOpen && (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" data-aos="zoom-in">
                            {gifts.map((gift, index) => (
                                <GiftCard key={index} gift={gift} onCopy={copyToClipboard} />
                            ))}
                            <div className="md:col-span-2 bg-white/50 p-6 rounded-lg shadow-md border border-accent/20">
                                <h3 className="font-playfair text-2xl text-accent">Kirim Hadiah Fisik</h3>
                                <p className="mt-2 text-text-secondary">Penerima: {physicalGift.name}</p>
                                <p className="mt-1 text-text-secondary">{physicalGift.address}</p>
                            </div>
                        </div>
                    )}
                </section>
                
                {/* Guestbook Section */}
                <Guestbook comments={comments} onCommentSubmit={handleCommentSubmit} />
                
                {/* Thank You Section */}
                <section 
                    className="relative py-20 px-6 text-center text-white bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://picsum.photos/1080/800?grayscale)' }}
                >
                    <div className="absolute inset-0 bg-black/75"></div>
                     <div className="relative z-10" data-aos="fade-up">
                        <p className="max-w-3xl mx-auto italic leading-relaxed">
                           [Placeholder: Ucapan terima kasih atas kehadiran dan doa restu.]
                        </p>
                        <p className="mt-8">Kami yang berbahagia,</p>
                        <h2 className="font-playfair text-5xl mt-2">{groom.nickname} &amp; {bride.nickname}</h2>
                        
                        <div className="mt-12 text-sm">
                          <p>Made with ❤️ by Rumah Undangan</p>
                          <div className="flex justify-center gap-4 mt-2">
                             <a href="#" className="hover:opacity-75">Instagram</a>
                             <a href="#" className="hover:opacity-75">TikTok</a>
                             <a href="#" className="hover:opacity-75">WhatsApp</a>
                          </div>
                        </div>
                    </div>
                </section>

            </main>
            
            <AudioPlayer isPlaying={isPlaying} onTogglePlay={togglePlay} isVisible={isCoverOpen} />
            <audio ref={audioRef} src="https://picsum.photos/200/300.mp3" loop />

            {lightboxImage && (
                <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
            )}
        </>
    );
};

export default App;
