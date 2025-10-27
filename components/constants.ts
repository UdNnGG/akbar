
import type { Person, EventDetails, LoveStory, Gift, GalleryItem, CoverDetails } from '../types';

export const cover: CoverDetails = {
    imageUrl: 'https://i.imgur.com/7yHF64i.jpeg',
    imagePosition: 'center center', // You can change this to 'top', 'bottom', or even '50% 25%' to adjust the focus.
};

export const groom: Person = {
    nickname: 'Agil',
    fullName: 'Agil Adi Saputro',
    fatherName: '[Nama Ayah Mempelai Pria]',
    motherName: '[Nama Ibu Mempelai Pria]',
};

export const bride: Person = {
    nickname: '[Wanita]',
    fullName: '[Nama Lengkap Mempelai Wanita]',
    fatherName: '[Nama Ayah Mempelai Wanita]',
    motherName: '[Nama Ibu Mempelai Wanita]',
};

export const events: EventDetails[] = [
    {
        name: 'Resepsi',
        date: new Date('2025-12-25T09:00:00'),
        time: 'Pukul : 09:00 WIB - Selesai',
        venue: 'Aula Desa Gunung Putri Selatan',
        address: 'Desa Gunung Putri Selatan',
        mapLink: 'https://maps.app.goo.gl/tYE7qVJJKB6wxNnq6',
    },
];

export const loveStories: LoveStory[] = [
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

// FIX: Added 'caption' property to each gallery item to satisfy the GalleryItem type.
export const galleryItems: GalleryItem[] = [
    { src: 'https://i.imgur.com/7yHF64i.jpeg', caption: 'Momen bahagia kami.', layout: 'overlay' },
    { src: 'https://picsum.photos/800/1200?random=11', caption: 'Kenangan yang tak terlupakan.', layout: 'split-left' },
    { src: 'https://picsum.photos/800/1200?random=12', caption: 'Cinta kami bersemi.', layout: 'split-right' },
    { src: 'https://picsum.photos/800/1200?random=16', caption: 'Selalu bersama selamanya.', layout: 'split-right' },
    { src: 'https://picsum.photos/800/1200?random=17', caption: 'Dua hati menjadi satu.', layout: 'split-left' },
];

export const gifts: Gift[] = [
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

export const physicalGift = {
    name: '[Nama Penerima Hadiah]',
    address: '[Alamat Lengkap untuk Kirim Hadiah Fisik]'
};