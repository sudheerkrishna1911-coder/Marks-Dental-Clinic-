export interface ServiceItem {
  id: string;
  name: string;
  iconName: string; // Dynamic mapping to Lucide Icons
  category: 'General' | 'Cosmetic' | 'Orthodontics' | 'Implants' | 'Preventive';
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  treatmentProcess: string[];
  faqs: { question: string; answer: string }[];
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  category: string;
  imageUrl: string;
  date: string;
  author: string;
}

export interface Appointment {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  treatmentRequired: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  treatment: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  category: 'Clinic' | 'Equipment' | 'Transformations';
  title: string;
  imageUrl: string;
  description: string;
  beforeAfter?: {
    beforeUrl: string;
    afterUrl: string;
  };
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: 'Unread' | 'Replied' | 'Archived';
  createdAt: string;
}
