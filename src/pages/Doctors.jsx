import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Award, Stethoscope, ShieldAlert, Calendar, DollarSign } from 'lucide-react';
import { doctorService } from '../services/doctorService';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState(['All']);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [minExperience, setMinExperience] = useState('');

  // Fetch doctors and specialties
  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        const specs = await doctorService.getSpecialties();
        setSpecialties(specs);
      } catch (err) {
        console.error('Error loading specialties:', err);
      }
    };
    loadFiltersData();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const data = await doctorService.getDoctors({
          search: searchQuery,
          specialty: selectedSpecialty,
          experience: minExperience,
        });
        setDoctors(data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchDoctors();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedSpecialty, minExperience]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Medical Staff</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-tight">
          Find Professional Specialists
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Search and book consultations with senior clinicians. Filter doctors by clinical department, practice experience, or location.
        </p>
      </div>

      {/* Advanced Filter Control Bar */}
      <Card hoverEffect={false} className="p-4 sm:p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Search bar input */}
          <div className="md:col-span-5 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Search Doctor Name / Specialization</label>
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex. Alexander, Cardiology, Metro Hospital..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Specialty Department Selection */}
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Clinical Department</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec === 'All' ? 'All Specializations' : spec}
                </option>
              ))}
            </select>
          </div>

          {/* Experience duration filter */}
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Min Practice Experience</label>
            <select
              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              <option value="">Any Experience</option>
              <option value="5">5+ Years Practice</option>
              <option value="10">10+ Years Practice</option>
              <option value="15">15+ Years Practice</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Grid of Results */}
      {loading ? (
        <div className="py-24 flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-primary dark:border-t-secondary animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Filtering our database consultants...</p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {doctors.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {doctors.map((doc) => (
                <motion.div
                  layout
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col justify-between group overflow-hidden">
                    <div className="space-y-5 text-left">
                      {/* Doctor avatar, name, rating */}
                      <div className="flex gap-4 items-start">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="h-16 w-16 rounded-2xl object-cover border border-teal-100 dark:border-teal-900/50 shrink-0 shadow-sm"
                        />
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/20 text-[10px] font-bold text-primary dark:text-secondary uppercase tracking-wider">
                            {doc.specialty}
                          </span>
                          <h3 className="font-display font-bold text-base sm:text-lg text-slate-800 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                            {doc.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            {doc.rating} <span className="text-slate-400 font-medium">({doc.reviews} Reviews)</span>
                          </div>
                        </div>
                      </div>

                      {/* Brief Bio */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {doc.about}
                      </p>

                      {/* Clinician specifications */}
                      <div className="py-3.5 border-y border-slate-50 dark:border-slate-800/40 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Award className="h-4.5 w-4.5 text-primary dark:text-secondary shrink-0" />
                          <div className="text-left">
                            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Experience</p>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{doc.experience} Years</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                          <div className="text-left">
                            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Consult Fee</p>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">${doc.fee}</p>
                          </div>
                        </div>
                      </div>

                      {/* Hospital & Availability */}
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <Stethoscope className="h-4 w-4 shrink-0 text-slate-400" />
                          <span className="truncate">{doc.hospital}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                          <span>Availability: <strong className="text-slate-700 dark:text-slate-200">{doc.availability.join(', ')}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Route CTA */}
                    <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/40">
                      <Link to={`/booking?doctorId=${doc.id}`} className="block">
                        <Button className="w-full">
                          Book Appointment
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center max-w-md mx-auto"
            >
              <Card hoverEffect={false} className="p-8 border-dashed flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">No Clinicians Found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We couldn't find any medical consultants matching your criteria. Try adjusting your search keywords, specialties, or experience duration filters.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialty('All');
                    setMinExperience('');
                  }}
                  variant="outline"
                  size="sm"
                >
                  Clear Filters
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Doctors;
