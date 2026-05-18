import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, Phone, Clipboard, CheckCircle2, 
  ChevronLeft, Stethoscope, AlertTriangle, ShieldCheck, HeartPulse
} from 'lucide-react';
import { doctorService } from '../services/doctorService';
import { appointmentService } from '../services/appointmentService';
import { useAuth } from '../store/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card } from '../components/ui/Card';

// Define Zod Validation Schema
const bookingSchema = z.object({
  patientName: z.string().min(3, 'Patient name must be at least 3 characters'),
  patientPhone: z.string().min(10, 'Contact number must be at least 10 digits'),
  specialty: z.string().min(1, 'Please select a clinical specialty department'),
  doctorId: z.string().min(1, 'Please choose your medical consultant'),
  date: z.string().refine((val) => new Date(val) >= new Date().setHours(0,0,0,0), {
    message: 'Appointment date must be today or in the future',
  }),
  timeSlot: z.string().min(1, 'Please choose an available appointment slot'),
  reason: z.string().min(5, 'Please provide a short reason for your consultation'),
});

const Booking = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [doctorsList, setDoctorsList] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedDoctorData, setSelectedDoctorData] = useState(null);
  
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      patientName: user?.name || '',
      patientPhone: '',
      specialty: '',
      doctorId: '',
      date: '',
      timeSlot: '',
      reason: '',
    },
  });

  const watchedSpecialty = watch('specialty');
  const watchedDoctorId = watch('doctorId');
  const watchedTimeSlot = watch('timeSlot');

  // Load database doctors & specialties
  useEffect(() => {
    const initData = async () => {
      try {
        const docs = await doctorService.getDoctors();
        setDoctorsList(docs);
        
        const specs = await doctorService.getSpecialties();
        setSpecialties(specs.filter(s => s !== 'All'));

        // Handle preselection from URL parameters
        const urlDocId = searchParams.get('doctorId');
        if (urlDocId) {
          const matchedDoc = docs.find(d => d.id === urlDocId);
          if (matchedDoc) {
            setValue('specialty', matchedDoc.specialty);
            // Delay setting doctorId slightly to allow filtered doctors to update
            setTimeout(() => {
              setValue('doctorId', matchedDoc.id);
            }, 50);
          }
        }
      } catch (err) {
        console.error('Error loading booking options:', err);
      }
    };
    initData();
  }, [searchParams, setValue]);

  // Filter Doctors based on Selected Specialty
  useEffect(() => {
    if (watchedSpecialty) {
      const filtered = doctorsList.filter(doc => doc.specialty === watchedSpecialty);
      setFilteredDoctors(filtered);
      
      // Clear doctor preselection if it doesn't match the new department
      const currentDoc = filtered.find(d => d.id === watchedDoctorId);
      if (!currentDoc) {
        setValue('doctorId', '');
        setSelectedDoctorData(null);
      }
    } else {
      setFilteredDoctors([]);
      setValue('doctorId', '');
      setSelectedDoctorData(null);
    }
  }, [watchedSpecialty, doctorsList, setValue, watchedDoctorId]);

  // Update selected doctor detailed info (e.g. available slots, fees)
  useEffect(() => {
    if (watchedDoctorId) {
      const match = doctorsList.find(d => d.id === watchedDoctorId);
      setSelectedDoctorData(match || null);
    } else {
      setSelectedDoctorData(null);
    }
  }, [watchedDoctorId, doctorsList]);

  // Sync user profile name on authentication
  useEffect(() => {
    if (user) {
      setValue('patientName', user.name);
    }
  }, [user, setValue]);

  const onFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        doctorName: selectedDoctorData.name,
        fee: selectedDoctorData.fee,
        hospital: selectedDoctorData.hospital,
      };
      const response = await appointmentService.bookAppointment(payload);
      setBookingSuccess(response);
    } catch (err) {
      alert(err.message || 'An error occurred during booking.');
    } finally {
      setSubmitting(false);
    }
  };

  // If not authenticated, prompt sign in with redirections
  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <Card hoverEffect={false} className="p-8 text-center border-dashed relative">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-teal-500/5 rounded-full blur-[50px] pointer-events-none" />
          <div className="flex flex-col items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 text-primary flex items-center justify-center">
              <HeartPulse className="h-8 w-8 text-primary dark:text-secondary" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white">Secure Health Account Required</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                To coordinate reservations, securely save electronic health forms, and sync details to clinicians, please set up a verified patient account.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-4">
              <Link to={`/auth?redirect=booking${searchParams.get('doctorId') ? `&doctorId=${searchParams.get('doctorId')}` : ''}`} className="flex-1">
                <Button className="w-full">Sign In / Register</Button>
              </Link>
              <Link to="/doctors" className="flex-1">
                <Button variant="outline" className="w-full">View Specialists</Button>
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/40 w-full flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-500" /> HIPAA Compliant</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-500" /> 256-bit Encrypted</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Success Confirmation Screen
  if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card hoverEffect={false} className="p-8 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Animated Checkmark */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center"
              >
                <CheckCircle2 className="h-10 w-10" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white">Appointment Reserved Successfully</h2>
              <p className="text-xs text-slate-400">Reference ID: <strong className="text-slate-600 dark:text-slate-300 select-all">{bookingSuccess.id}</strong></p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/40 rounded-2xl p-5 text-left space-y-3.5 max-w-md mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/50 dark:border-slate-800/50">
                <span className="text-xs text-slate-400">Department</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{bookingSuccess.specialty}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Doctor</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white">{bookingSuccess.doctorName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Date</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{bookingSuccess.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Time Slot</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{bookingSuccess.timeSlot}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Patient Name</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{bookingSuccess.patientName}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                <span className="text-xs text-slate-400">Consultation Fee</span>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">${bookingSuccess.fee}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 max-w-md mx-auto">
              <Link to="/dashboard" className="flex-1">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => setBookingSuccess(null)}
                className="flex-1"
              >
                Book Another Slot
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Link to="/doctors" className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 transition-colors">
          <ChevronLeft className="h-4.5 w-4.5" />
        </Link>
        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Appointment Booking</p>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-800 dark:text-white">Schedule Clinical Slot</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container */}
        <Card hoverEffect={false} className="lg:col-span-8 p-6 bg-white dark:bg-slate-900">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-left">
            
            {/* Row 1: Patient Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="patientName"
                label="Patient Name"
                icon={<User className="h-4.5 w-4.5" />}
                placeholder="Full Name"
                error={errors.patientName?.message}
                {...register('patientName')}
              />
              <Input
                id="patientPhone"
                label="Contact Number"
                icon={<Phone className="h-4.5 w-4.5" />}
                placeholder="+1 (555) 000-0000"
                error={errors.patientPhone?.message}
                {...register('patientPhone')}
              />
            </div>

            {/* Row 2: Specialty & Doctor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Clinical Specialty</label>
                <div className="relative flex items-center">
                  <Stethoscope className="absolute left-4 h-4.5 w-4.5 text-slate-400" />
                  <select
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                    {...register('specialty')}
                  >
                    <option value="">Choose department</option>
                    {specialties.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                {errors.specialty && <span className="text-xs text-red-500 font-medium pl-1">{errors.specialty.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Clinician Consultant</label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 h-4.5 w-4.5 text-slate-400" />
                  <select
                    disabled={!watchedSpecialty}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 cursor-pointer"
                    {...register('doctorId')}
                  >
                    <option value="">{watchedSpecialty ? 'Choose specialist' : 'Select specialty first'}</option>
                    {filteredDoctors.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.name}</option>
                    ))}
                  </select>
                </div>
                {errors.doctorId && <span className="text-xs text-red-500 font-medium pl-1">{errors.doctorId.message}</span>}
              </div>
            </div>

            {/* Row 3: Calendar Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="date"
                type="date"
                label="Preferred Date"
                icon={<Calendar className="h-4.5 w-4.5" />}
                error={errors.date?.message}
                {...register('date')}
              />
              <div className="hidden sm:block" />
            </div>

            {/* Row 4: Available Time Slots Grid */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Available Consultation Slots</label>
              {selectedDoctorData ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedDoctorData.slots.map((slot) => {
                    const isSelected = watchedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setValue('timeSlot', slot, { shouldValidate: true })}
                        className={`py-3 px-4 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
                            : 'border-slate-100 dark:border-slate-800 hover:border-primary bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary'
                        }`}
                      >
                        <Clock className="inline-block mr-1.5 h-3.5 w-3.5 shrink-0" />
                        {slot}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/20 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800">
                  Select a clinical doctor to load active slot timetables.
                </div>
              )}
              {errors.timeSlot && <span className="text-xs text-red-500 font-medium pl-1 mt-1">{errors.timeSlot.message}</span>}
            </div>

            {/* Row 5: Consultation Notes */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reason" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Reason for Consultation</label>
              <div className="relative">
                <Clipboard className="absolute left-4 top-4.5 h-4.5 w-4.5 text-slate-400" />
                <textarea
                  id="reason"
                  rows="4"
                  placeholder="Describe your health symptoms or specific medical concerns in detail..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-left"
                  {...register('reason')}
                />
              </div>
              {errors.reason && <span className="text-xs text-red-500 font-medium pl-1">{errors.reason.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-50 dark:border-slate-800/40">
              <Button
                type="submit"
                loading={submitting}
                className="w-full sm:w-auto"
                icon={<Calendar className="h-4.5 w-4.5" />}
              >
                Confirm Appointment Reservation
              </Button>
            </div>

          </form>
        </Card>

        {/* Doctor Spotlight Panel Card */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <Card hoverEffect={false} className="bg-white dark:bg-slate-900 overflow-hidden">
            <h3 className="font-display font-bold text-sm tracking-wide text-slate-800 dark:text-white uppercase mb-4">Clinician Spotlight</h3>
            {selectedDoctorData ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={selectedDoctorData.avatar}
                    alt={selectedDoctorData.name}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-100 dark:border-slate-800"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white leading-tight">{selectedDoctorData.name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">{selectedDoctorData.specialty}</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                  "{selectedDoctorData.about}"
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/40 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Practice Tenure</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedDoctorData.experience} Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hospital Division</span>
                    <span className="font-bold text-slate-850 dark:text-slate-200 text-right truncate pl-4 max-w-[180px]">{selectedDoctorData.hospital}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-400 font-medium">Standard Consult Fee</span>
                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">${selectedDoctorData.fee}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-400 flex flex-col items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                No practitioner preselected. Please pick a clinical specialist to view details here.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;
