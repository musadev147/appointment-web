import axiosInstance from '../api/axiosInstance';

// In a real application, these would call endpoints like: axiosInstance.post('/appointments')
const getLocalAppointments = () => {
  const data = localStorage.getItem('medsphere-appointments');
  if (data) return JSON.parse(data);

  // Return baseline default appointments for a professional look
  const defaults = [
    {
      id: 'apt-101',
      doctorId: 'doc-1',
      doctorName: 'Dr. Alexander Thorne',
      specialty: 'Cardiology',
      date: '2026-05-25',
      time: '10:30 AM',
      patientName: 'Jane Doe',
      patientPhone: '+1 (555) 019-2834',
      reason: 'Routine cardiovascular screening checkup',
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'apt-102',
      doctorId: 'doc-2',
      doctorName: 'Dr. Sophia Martinez',
      specialty: 'Pediatrics',
      date: '2026-05-12',
      time: '01:30 PM',
      patientName: 'Johnny Doe',
      patientPhone: '+1 (555) 019-2834',
      reason: 'Standard growth and development wellness check',
      status: 'completed',
      createdAt: new Date().toISOString(),
    }
  ];
  localStorage.setItem('medsphere-appointments', JSON.stringify(defaults));
  return defaults;
};

export const appointmentService = {
  getAppointments: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getLocalAppointments();
  },

  bookAppointment: async (appointmentData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const appointments = getLocalAppointments();
    const newAppointment = {
      id: `apt-${Math.floor(Math.random() * 90000) + 10000}`,
      ...appointmentData,
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };

    appointments.unshift(newAppointment);
    localStorage.setItem('medsphere-appointments', JSON.stringify(appointments));
    return newAppointment;
  },

  cancelAppointment: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const appointments = getLocalAppointments();
    const updated = appointments.map((apt) => {
      if (apt.id === id) {
        return { ...apt, status: 'cancelled' };
      }
      return apt;
    });
    localStorage.setItem('medsphere-appointments', JSON.stringify(updated));
    return true;
  },
};
