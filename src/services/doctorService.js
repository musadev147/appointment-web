import axiosInstance from '../api/axiosInstance';

// In a real application, these would call endpoints like: axiosInstance.get('/doctors')
// We build a robust service layer with mock databases that acts identically to a real backend.
const MOCK_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Alexander Thorne',
    specialty: 'Cardiology',
    experience: 15,
    rating: 4.9,
    reviews: 142,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    availability: ['Mon', 'Wed', 'Fri'],
    slots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    fee: 150,
    about: 'Dr. Thorne is a world-class cardiologist with over 15 years of experience in interventional cardiology and preventive cardiovascular health.',
    hospital: 'Metropolitan Heart & Vascular Center',
  },
  {
    id: 'doc-2',
    name: 'Dr. Sophia Martinez',
    specialty: 'Pediatrics',
    experience: 10,
    rating: 4.8,
    reviews: 98,
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=250',
    availability: ['Mon', 'Tue', 'Thu', 'Fri'],
    slots: ['08:30 AM', '11:00 AM', '01:30 PM', '04:00 PM'],
    fee: 120,
    about: 'Dr. Martinez is dedicated to providing compassionate, comprehensive pediatric care from infancy through adolescence, focusing on growth development.',
    hospital: 'Childrens Health & Wellness Hospital',
  },
  {
    id: 'doc-3',
    name: 'Dr. Julian Vance',
    specialty: 'Neurology',
    experience: 18,
    rating: 4.95,
    reviews: 210,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    availability: ['Tue', 'Thu'],
    slots: ['10:00 AM', '11:30 AM', '03:00 PM', '04:30 PM'],
    fee: 200,
    about: 'Dr. Vance is a double-board certified neurologist specializing in cognitive disorders, neuromuscular therapies, and advanced headache management.',
    hospital: 'Neuroscience and Spine Institute',
  },
  {
    id: 'doc-4',
    name: 'Dr. Emily Chen',
    specialty: 'Orthopedics',
    experience: 12,
    rating: 4.75,
    reviews: 86,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
    availability: ['Wed', 'Thu', 'Fri'],
    slots: ['09:30 AM', '11:00 AM', '02:30 PM', '05:00 PM'],
    fee: 160,
    about: 'Dr. Chen specializes in arthroscopic surgery, sports injuries, and joint reconstruction. She has worked with various professional athletes.',
    hospital: 'Orthopedic & Joint Care Clinic',
  },
  {
    id: 'doc-5',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Dermatology',
    experience: 8,
    rating: 4.9,
    reviews: 124,
    avatar: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=250',
    availability: ['Mon', 'Tue', 'Wed'],
    slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    fee: 110,
    about: 'Dr. Jenkins provides state-of-the-art diagnostic and therapeutic medical, surgical, and cosmetic dermatology services for patients of all ages.',
    hospital: 'Skinsational Medical & Aesthetic Center',
  },
  {
    id: 'doc-6',
    name: 'Dr. Marcus Vance',
    specialty: 'Oncology',
    experience: 20,
    rating: 4.97,
    reviews: 312,
    avatar: 'https://images.unsplash.com/photo-1582750433449-64c676ee7424?auto=format&fit=crop&q=80&w=250',
    availability: ['Mon', 'Wed', 'Thu'],
    slots: ['10:30 AM', '01:00 PM', '04:00 PM'],
    fee: 220,
    about: 'Dr. Marcus Vance is a renowned oncologist focusing on novel targeted immunotherapies, clinical trials, and multi-disciplinary cancer treatments.',
    hospital: 'Hope Cancer Care and Research Institute',
  }
];

export const doctorService = {
  getDoctors: async (filters = {}) => {
    // Simulate short network latency
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    let doctors = [...MOCK_DOCTORS];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      doctors = doctors.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchLower) ||
          doc.specialty.toLowerCase().includes(searchLower) ||
          doc.hospital.toLowerCase().includes(searchLower)
      );
    }

    if (filters.specialty && filters.specialty !== 'All') {
      doctors = doctors.filter((doc) => doc.specialty === filters.specialty);
    }

    if (filters.experience) {
      doctors = doctors.filter((doc) => doc.experience >= parseInt(filters.experience, 10));
    }

    return doctors;
  },

  getDoctorById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const doctor = MOCK_DOCTORS.find((doc) => doc.id === id);
    if (!doctor) throw new Error('Doctor not found');
    return doctor;
  },

  getSpecialties: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const specialties = ['All', ...new Set(MOCK_DOCTORS.map((doc) => doc.specialty))];
    return specialties;
  },
};
