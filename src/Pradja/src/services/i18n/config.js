/**
 * i18n Configuration
 * Internationalization setup with react-i18next
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
// In production, these would be loaded from /public/locales/
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        properties: 'Properties',
        agents: 'Agents',
        about: 'About',
        contact: 'Contact',
        login: 'Login',
        dashboard: 'Dashboard'
      },
      
      // Home page
      home: {
        hero: {
          title: 'Find Your Dream Property',
          subtitle: 'Discover the best properties in Indonesia with trusted professional service',
          searchPlaceholder: 'Enter location, city, or area...',
          searchButton: 'Search Properties'
        },
        stats: {
          properties: 'Properties Listed',
          clients: 'Happy Clients',
          agents: 'Expert Agents',
          experience: 'Years Experience'
        },
        features: {
          title: 'Why Choose Us',
          subtitle: 'Your trusted partner in finding the perfect property'
        },
        properties: {
          title: 'Featured Properties',
          subtitle: 'Handpicked premium properties for you',
          viewDetails: 'View Details',
          viewAll: 'View All Properties'
        },
        testimonials: {
          title: 'Client Testimonials',
          subtitle: 'What our clients say about us'
        },
        cta: {
          title: 'Ready to Find Your Dream Property?',
          description: 'Contact our expert agents today',
          browse: 'Browse Properties',
          contact: 'Contact Us'
        }
      },
      
      // Properties page
      properties: {
        title: 'Property Listings',
        subtitle: 'Showing {{count}} properties',
        filters: {
          title: 'Filters',
          clear: 'Clear All',
          search: 'Search',
          searchPlaceholder: 'Search properties...',
          type: 'Property Type',
          allTypes: 'All Types',
          price: 'Price Range',
          bedrooms: 'Bedrooms',
          bathrooms: 'Bathrooms',
          show: 'Filters'
        },
        sort: {
          newest: 'Newest First',
          oldest: 'Oldest First',
          priceLow: 'Price: Low to High',
          priceHigh: 'Price: High to Low'
        },
        results: 'properties found',
        noResults: 'No properties found',
        noResultsDesc: 'Try adjusting your filters or search terms',
        clearFilters: 'Clear Filters',
        viewDetails: 'View Details'
      },
      
      // Contact page
      contact: {
        title: 'Contact Us',
        subtitle: 'Get in touch with our team',
        getInTouch: 'Get In Touch',
        description: "Have questions? We're here to help.",
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        hours: 'Business Hours',
        sendMessage: 'Send us a Message',
        form: {
          name: 'Full Name',
          email: 'Email Address',
          phone: 'Phone Number',
          subject: 'Subject',
          message: 'Message',
          submit: 'Send Message'
        },
        success: 'Thank you! Your message has been sent successfully.'
      },
      
      // Footer
      footer: {
        description: 'Leading real estate company providing premium property solutions in Indonesia. Your trusted partner in finding the perfect home.',
        quickLinks: 'Quick Links',
        company: 'Company',
        contact: 'Contact',
        followUs: 'Follow Us',
        aboutUs: 'About Us',
        careers: 'Careers',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        allRightsReserved: 'All Rights Reserved',
        address: 'Address',
        phone: 'Phone',
        email: 'Email'
      },
      
      // App
      app: {
        name: 'PT Pradja Artha Sejahtera',
        tagline: 'Your Trusted Property Partner'
      },
      
      // Properties
      properties: {
        title: 'Properties',
        showing: 'Showing {{count}} properties',
        noResults: 'No properties found',
        filter: 'Filter',
        search: 'Search properties...',
        type: 'Property Type',
        priceRange: 'Price Range',
        bedrooms: 'Bedrooms',
        bathrooms: 'Bathrooms',
        any: 'Any'
      },
      
      // Admin
      admin: {
        menu: {
          dashboard: 'Dashboard',
          properties: 'Properties',
          agents: 'Agents',
          companyInfo: 'Company Info',
          profile: 'Profile',
          logout: 'Logout'
        },
        login: {
          title: 'Admin Login',
          subtitle: 'Enter your credentials to access the admin panel',
          email: 'Email Address',
          password: 'Password',
          remember: 'Remember me',
          forgot: 'Forgot password?',
          submit: 'Sign In',
          loading: 'Signing in...',
          error: 'Invalid email or password',
          demo: 'Demo Credentials'
        },
        dashboard: {
          welcome: 'Welcome back, Admin!',
          subtitle: "Here's what's happening with your properties today",
          addProperty: 'Add Property',
          totalProperties: 'Total Properties',
          totalAgents: 'Total Agents',
          totalSales: 'Total Sales',
          inquiries: 'Inquiries',
          recentProperties: 'Recent Properties',
          viewAll: 'View All',
          table: {
            property: 'Property',
            location: 'Location',
            price: 'Price',
            status: 'Status',
            views: 'Views',
            actions: 'Actions'
          },
          quickActions: 'Quick Actions',
          addAgent: 'Add Agent',
          editCompany: 'Edit Company Info'
        }
      },
      
      // Error pages
      errors: {
        notFound: {
          title: 'Page Not Found',
          description: "Sorry, the page you're looking for doesn't exist.",
          goHome: 'Go to Homepage',
          goBack: 'Go Back',
          quickLinks: 'Quick Links:',
          searchPlaceholder: 'Search for properties...'
        }
      },
      
      // Common
      common: {
        loading: 'Loading...',
        submit: 'Submit',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        close: 'Close',
        yes: 'Yes',
        no: 'No',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        clear: 'Clear',
        apply: 'Apply',
        reset: 'Reset'
      }
    }
  },
  
  id: {
    translation: {
      // Navigation
      nav: {
        home: 'Beranda',
        properties: 'Properti',
        agents: 'Agen',
        about: 'Tentang',
        contact: 'Kontak',
        login: 'Masuk',
        dashboard: 'Dashboard'
      },
      
      // Home page
      home: {
        hero: {
          title: 'Temukan Properti Impian Anda',
          subtitle: 'Temukan properti terbaik di Indonesia dengan layanan profesional terpercaya',
          searchPlaceholder: 'Masukkan lokasi, kota, atau area...',
          searchButton: 'Cari Properti'
        },
        stats: {
          properties: 'Properti Terdaftar',
          clients: 'Klien Puas',
          agents: 'Agen Ahli',
          experience: 'Tahun Pengalaman'
        },
        features: {
          title: 'Mengapa Memilih Kami',
          subtitle: 'Mitra terpercaya Anda dalam menemukan properti sempurna'
        },
        properties: {
          title: 'Properti Unggulan',
          subtitle: 'Properti premium pilihan untuk Anda',
          viewDetails: 'Lihat Detail',
          viewAll: 'Lihat Semua Properti'
        },
        testimonials: {
          title: 'Testimoni Klien',
          subtitle: 'Apa kata klien kami tentang kami'
        },
        cta: {
          title: 'Siap Menemukan Properti Impian Anda?',
          description: 'Hubungi agen ahli kami hari ini',
          browse: 'Jelajahi Properti',
          contact: 'Hubungi Kami'
        }
      },
      
      // Properties page
      properties: {
        title: 'Daftar Properti',
        subtitle: 'Menampilkan {{count}} properti',
        filters: {
          title: 'Filter',
          clear: 'Hapus Semua',
          search: 'Cari',
          searchPlaceholder: 'Cari properti...',
          type: 'Tipe Properti',
          allTypes: 'Semua Tipe',
          price: 'Rentang Harga',
          bedrooms: 'Kamar Tidur',
          bathrooms: 'Kamar Mandi',
          show: 'Filter'
        },
        sort: {
          newest: 'Terbaru',
          oldest: 'Terlama',
          priceLow: 'Harga: Rendah ke Tinggi',
          priceHigh: 'Harga: Tinggi ke Rendah'
        },
        results: 'properti ditemukan',
        noResults: 'Tidak ada properti ditemukan',
        noResultsDesc: 'Coba sesuaikan filter atau kata kunci pencarian Anda',
        clearFilters: 'Hapus Filter',
        viewDetails: 'Lihat Detail'
      },
      
      // Contact page
      contact: {
        title: 'Hubungi Kami',
        subtitle: 'Hubungi tim kami',
        getInTouch: 'Hubungi Kami',
        description: 'Ada pertanyaan? Kami siap membantu.',
        address: 'Alamat',
        phone: 'Telepon',
        email: 'Email',
        hours: 'Jam Operasional',
        sendMessage: 'Kirim Pesan',
        form: {
          name: 'Nama Lengkap',
          email: 'Alamat Email',
          phone: 'Nomor Telepon',
          subject: 'Subjek',
          message: 'Pesan',
          submit: 'Kirim Pesan'
        },
        success: 'Terima kasih! Pesan Anda telah terkirim.'
      },
      
      // Footer
      footer: {
        description: 'Perusahaan properti terkemuka yang menyediakan solusi properti premium di Indonesia. Mitra terpercaya Anda dalam menemukan rumah yang sempurna.',
        quickLinks: 'Tautan Cepat',
        company: 'Perusahaan',
        contact: 'Kontak',
        followUs: 'Ikuti Kami',
        aboutUs: 'Tentang Kami',
        careers: 'Karir',
        privacy: 'Kebijakan Privasi',
        terms: 'Syarat Layanan',
        allRightsReserved: 'Hak Cipta Dilindungi',
        address: 'Alamat',
        phone: 'Telepon',
        email: 'Email'
      },
      
      // App
      app: {
        name: 'PT Pradja Artha Sejahtera',
        tagline: 'Mitra Properti Terpercaya Anda'
      },
      
      // Admin
      admin: {
        menu: {
          dashboard: 'Dashboard',
          properties: 'Properti',
          agents: 'Agen',
          companyInfo: 'Info Perusahaan',
          profile: 'Profil',
          logout: 'Keluar'
        },
        login: {
          title: 'Login Admin',
          subtitle: 'Masukkan kredensial Anda untuk mengakses panel admin',
          email: 'Alamat Email',
          password: 'Kata Sandi',
          remember: 'Ingat saya',
          forgot: 'Lupa kata sandi?',
          submit: 'Masuk',
          loading: 'Memproses...',
          error: 'Email atau kata sandi salah',
          demo: 'Kredensial Demo'
        },
        dashboard: {
          welcome: 'Selamat datang kembali, Admin!',
          subtitle: 'Ini yang terjadi dengan properti Anda hari ini',
          addProperty: 'Tambah Properti',
          totalProperties: 'Total Properti',
          totalAgents: 'Total Agen',
          totalSales: 'Total Penjualan',
          inquiries: 'Pertanyaan',
          recentProperties: 'Properti Terbaru',
          viewAll: 'Lihat Semua',
          table: {
            property: 'Properti',
            location: 'Lokasi',
            price: 'Harga',
            status: 'Status',
            views: 'Tampilan',
            actions: 'Aksi'
          },
          quickActions: 'Aksi Cepat',
          addAgent: 'Tambah Agen',
          editCompany: 'Edit Info Perusahaan'
        }
      },
      
      // Error pages
      errors: {
        notFound: {
          title: 'Halaman Tidak Ditemukan',
          description: 'Maaf, halaman yang Anda cari tidak ada.',
          goHome: 'Ke Beranda',
          goBack: 'Kembali',
          quickLinks: 'Tautan Cepat:',
          searchPlaceholder: 'Cari properti...'
        }
      },
      
      // Common
      common: {
        loading: 'Memuat...',
        submit: 'Kirim',
        cancel: 'Batal',
        save: 'Simpan',
        delete: 'Hapus',
        edit: 'Edit',
        view: 'Lihat',
        close: 'Tutup',
        yes: 'Ya',
        no: 'Tidak',
        search: 'Cari',
        filter: 'Filter',
        sort: 'Urutkan',
        clear: 'Hapus',
        apply: 'Terapkan',
        reset: 'Reset'
      }
    }
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false // React already escapes
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
