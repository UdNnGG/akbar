
export interface Comment {
    name: string;
    message: string;
    attendance: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
    timestamp: Date;
}

export interface Person {
    nickname: string;
    fullName: string;
    fatherName: string;
    motherName: string;
}

export interface EventDetails {
    name: string;
    date: Date;
    time: string;
    venue: string;
    address: string;
    mapLink: string;
}

export interface LoveStory {
    title: string;
    description: string;
    imageUrl: string;
}

export interface Gift {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    logoUrl?: string; // Optional if you want to use img tags with src
}

export interface GalleryItem {
  src: string;
  caption: string;
  layout?: 'overlay' | 'split-left' | 'split-right';
}

export interface CoverDetails {
  imageUrl: string;
  imagePosition?: string; // E.g., 'center center', 'top center', '25% 50%'
}
