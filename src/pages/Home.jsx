import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, ShieldCheck, HeartPulse, Sparkles, Star, ChevronRight, 
  ArrowRight, Users, Award, Clock, HelpCircle, ChevronDown, CheckCircle2 
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: '99%', label: 'Patient Satisfaction', icon: <HeartPulse className="h-5 w-5 text-emerald-500" /> },
    { value: '250+', label: 'Expert Specialists', icon: <Users className="h-5 w-5 text-teal-500" /> },
    { value: '15+', label: 'Years Excellence', icon: <Award className="h-5 w-5 text-indigo-500" /> },
    { value: '24/7', label: 'Emergency Support', icon: <Clock className="h-5 w-5 text-rose-500" /> },
  ];

  const hospitalLogos = [
    'Mayo Clinic', 'Johns Hopkins', 'Cleveland Clinic', 
    'Mass General', 'Stanford Health', 'UCSF Medical'
  ];

  const services = [
    {
      title: 'Cardiology',
      desc: 'Expert preventive screenings, valve care, and interventional cardiac treatments.',
      icon: '❤️',
      color: 'from-red-500/10 to-rose-500/10 text-red-600',
    },
    {
      title: 'Pediatrics',
      desc: 'Nurturing, compassionate wellness checkups and developmental therapies.',
      icon: '👶',
      color: 'from-amber-500/10 to-orange-500/10 text-amber-600',
    },
    {
      title: 'Neurology',
      desc: 'Comprehensive diagnostic treatments for cognitive disorders and neural pains.',
      icon: '🧠',
      color: 'from-purple-500/10 to-indigo-500/10 text-purple-600',
    },
    {
      title: 'Orthopedics',
      desc: 'Surgical and non-surgical procedures for joints, spine, and muscle injuries.',
      icon: '🦴',
      color: 'from-blue-500/10 to-sky-500/10 text-blue-600',
    },
  ];

  const topDoctors = [
    {
      id: 'doc-1',
      name: 'Dr. Alexander Thorne',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 142,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    },
    {
      id: 'doc-2',
      name: 'Dr. Sophia Martinez',
      specialty: 'Pediatrics',
      rating: 4.8,
      reviews: 98,
      avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=250',
    },
    {
      id: 'doc-3',
      name: 'Dr. Julian Vance',
      specialty: 'Neurology',
      rating: 4.95,
      reviews: 210,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    },
  ];

  const testimonials = [
    {
      quote: "The booking process was exceptionally fast. Within minutes, I had a scheduled cardiology appointment. Dr. Thorne was thorough, reassuring, and highly professional.",
      name: "Marcus Aurelius",
      title: "Heart Patient",
      rating: 5,
    },
    {
      quote: "As a working parent, the scheduling flexibility at MedSphere is a lifesaver. Dr. Martinez has a wonderful way with kids. Extremely satisfied with our wellness visit.",
      name: "Helen Troilus",
      title: "Mother of Two",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "How do I schedule an appointment online?",
      a: "Simply click the 'Book Appointment' button at the top of the screen. You can select your desired medical specialty, choose your preferred specialist, choose from available morning or afternoon slots, and fill in your basic details. The booking is instantly confirmed and updated in your patient dashboard."
    },
    {
      q: "Does the hospital support emergency drop-ins?",
      a: "Yes. Our emergency unit operates 24/7. For critical conditions, we strongly advise dialing our emergency clinic line +1 (800) 555-0199 or arriving immediately at our main emergency admission clinic."
    },
    {
      q: "Can I manage or reschedule my booking later?",
      a: "Absolutely. Once registered and logged in, you can access your private 'Dashboard' at any time. There, you can view your upcoming appointments and easily cancel or review past appointment details."
    },
    {
      q: "Do you accept standard medical insurance packages?",
      a: "Yes, MedSphere is affiliated with major insurance networks including Aetna, Cigna, Blue Cross Blue Shield, and UnitedHealthcare. Please bring your insurance credentials during admission so we can process claims."
    }
  ];

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-primary dark:text-secondary text-xs font-semibold"
            >
              <Sparkles className="h-3.5 w-3.5" />
              World-Class Integrated Hospital System
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              Healthcare Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Human Wellness</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed"
            >
              Connect directly with top certified medical specialists. Book online, manage electronic health records, and access world-class clinical laboratories—all from our centralized digital health hub.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link to="/booking">
                <Button size="lg" icon={<Calendar className="h-5 w-5" />}>
                  Book Appointment
                </Button>
              </Link>
              <Link to="/doctors">
                <Button variant="outline" size="lg" icon={<ChevronRight className="h-5 w-5" />}>
                  Find Specialists
                </Button>
              </Link>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-100 dark:border-slate-800/40"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    {stat.icon}
                    <span className="font-display font-extrabold text-xl sm:text-2xl text-slate-800 dark:text-white">{stat.value}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Right Image / Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Background glowing decorations */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl blur-2xl -z-10" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 w-full max-w-[420px] aspect-[4/5] bg-slate-100 dark:bg-slate-800 animate-float">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
                alt="Medical Practitioner Diagnostic"
                className="w-full h-full object-cover"
              />
              {/* Glass overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-light dark:glass-dark p-4 rounded-2xl flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-500/20 shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 dark:text-white">HIPAA Certified Portal</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">100% Encrypted Data Storage</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUSTED HOSPITALS BANNER */}
      <section className="bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/40 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
            Partnered with and Trusted by Leading Global Healthcare Networks
          </p>
          <div className="relative w-full overflow-hidden flex items-center">
            {/* Auto scrolling marquee */}
            <div className="flex gap-16 animate-marquee whitespace-nowrap">
              {[...hospitalLogos, ...hospitalLogos].map((name, index) => (
                <span 
                  key={index} 
                  className="font-display font-bold text-lg text-slate-400 dark:text-slate-500 flex items-center gap-2 select-none"
                >
                  <HeartPulse className="h-4.5 w-4.5 text-teal-500/30" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEDICAL SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Medical Specialties</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
            Integrated Primary & Specialization Clinics
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Our medical staff is composed of double-board-certified clinicians specializing across various clinical departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc, idx) => (
            <Card key={idx} className="text-left flex flex-col justify-between hover:scale-105 transition-transform duration-300">
              <div className="space-y-4">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-tr ${svc.color} flex items-center justify-center text-2xl`}>
                  {svc.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">{svc.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{svc.desc}</p>
              </div>
              <div className="pt-6">
                <Link to="/services" className="inline-flex items-center gap-1 text-xs font-bold text-primary dark:text-secondary hover:underline group">
                  Learn Details
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. DOCTORS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Expert Doctors</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
            Meet Our Senior Medical Consultants
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Our staff provides premium health consultations. Meet a few of our board-certified clinical division directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topDoctors.map((doc) => (
            <Card key={doc.id} className="text-center group overflow-hidden">
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-teal-100 dark:border-teal-900 shrink-0">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                    {doc.specialty}
                  </p>
                </div>
                <div className="flex items-center gap-1 py-1 px-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-xs font-bold text-amber-500 border border-slate-100 dark:border-slate-800">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  {doc.rating} <span className="text-slate-400">({doc.reviews} Reviews)</span>
                </div>
                <div className="w-full pt-4 border-t border-slate-50 dark:border-slate-800/40">
                  <Link to={`/booking?doctorId=${doc.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. APPOINTMENT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-800 to-teal-950 p-8 sm:p-12 lg:p-16 text-left shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Ready to Experience Next-Generation Care?
              </h2>
              <p className="text-sm sm:text-base text-teal-100/80 leading-relaxed max-w-2xl">
                Get diagnosed online or book clinical slots directly. Create a permanent health file, consult senior physicians, and take command of your medical well-being.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/booking">
                  <Button variant="secondary" size="lg" icon={<Calendar className="h-5 w-5" />}>
                    Schedule Appointment
                  </Button>
                </Link>
                <a href="tel:18005550199" className="inline-flex items-center justify-center font-bold text-white hover:text-secondary py-3 px-4 transition-colors">
                  <Clock className="mr-2 h-5 w-5 text-secondary" />
                  Call Clinic Line
                </a>
              </div>
            </div>
            
            {/* Quick checkmarks */}
            <div className="lg:col-span-4 space-y-4 border-l border-teal-800/60 pl-0 lg:pl-8">
              {[
                'Instant calendar synchronization',
                'Automatic SMS and email alerts',
                'Insurance claims pre-processing',
                'Telehealth diagnostic compatibility'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-teal-50">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Testimonials</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
            Loved & Endorsed by Our Patients
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Read positive real stories shared by patients who took back control of their wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="text-left flex flex-col justify-between p-8 relative">
              {/* Quote marks decoration */}
              <span className="absolute top-4 right-8 font-serif text-8xl text-slate-100 dark:text-slate-800/40 leading-none select-none">“</span>
              <div className="space-y-6 relative">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-6 border-t border-slate-50 dark:border-slate-800/40 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center font-display font-extrabold text-primary dark:text-secondary text-sm shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-8">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Support FAQ</span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white leading-tight">
            Frequently Answered Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Quickly resolve support inquiries regarding online scheduling, clinical hours, and diagnostics.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-white dark:bg-slate-900/60 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm sm:text-base text-slate-800 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary dark:text-secondary' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
