import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, ShieldCheck, ChevronRight, Activity, Beaker, ClipboardList, 
  Sparkles, Award, Star, Calendar, Microscope, Waves 
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Services = () => {
  const [activeTab, setActiveTab] = useState('cardio');

  const departments = [
    {
      id: 'cardio',
      name: 'Cardiology',
      icon: <HeartPulse className="h-5 w-5" />,
      tagline: 'Heart & Vascular Excellence',
      banner: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      successRate: '98.8%',
      specialists: 14,
      equip: '3D Echocardiography, Siemens Cath Lab',
      desc: 'MedSphere leads the nation in cardiology diagnostics and cardiovascular surgery. Our interventional programs are engineered for prompt diagnostics, preventive therapy, and robotic valve repairs.',
      treatments: [
        'Preventive cardiac stress screenings',
        'Robotic valve repair & bypass surgeries',
        'Advanced cardiac catheterization labs',
        'Holter monitoring & arrhythmia therapies'
      ]
    },
    {
      id: 'pediat',
      name: 'Pediatrics',
      icon: '👶',
      tagline: 'Compassionate Child Health',
      banner: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
      successRate: '99.4%',
      specialists: 12,
      equip: 'Neonatal Incubators, Child Care Labs',
      desc: 'Our pediatric division coordinates development metrics, vaccinations, and pediatric acute care. We prioritize a child-friendly atmosphere to deliver warm, supportive care.',
      treatments: [
        'Infant growth and development checkups',
        'Neonatal and pediatric emergency care',
        'Immunization programs & nutrition guides',
        'Pediatric asthma & respiratory support'
      ]
    },
    {
      id: 'neuro',
      name: 'Neurology',
      icon: <Activity className="h-5 w-5" />,
      tagline: 'Cognitive & Neuromuscular Center',
      banner: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
      successRate: '94.2%',
      specialists: 8,
      equip: '1.5T MRI, 128-Slice CT, HD-EEG',
      desc: 'Specializing in diagnosis and treatment for brain injuries, neuro-spinal pain, and muscular degeneration. Dr. Julian Vance leads a multi-disciplinary neuro-therapy program.',
      treatments: [
        'Comprehensive migraine/headache clinics',
        'Electromyography (EMG) muscle testing',
        'Stroke prevention & neurological rehab',
        'Spinal stenosis & degenerative nerve therapy'
      ]
    },
    {
      id: 'ortho',
      name: 'Orthopedics',
      icon: <Microscope className="h-5 w-5" />,
      tagline: 'Advanced Joint Restoration',
      banner: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      successRate: '96.5%',
      specialists: 10,
      equip: 'Stryker Surgical Robots, Bio-Implant Kits',
      desc: 'Specialists coordinate arthroscopic knee/shoulder therapies, hip replacements, and comprehensive post-surgery physical rehab. Engineered for athletic recovery.',
      treatments: [
        'Total hip & knee replacements',
        'Arthroscopic joint repairs & sports injury recovery',
        'Post-fracture orthotics & custom splinting',
        'Pediatric orthopedic bone corrections'
      ]
    },
    {
      id: 'derm',
      name: 'Dermatology',
      icon: <Sparkles className="h-5 w-5" />,
      tagline: 'Clinical & Esthetic Dermatology',
      banner: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400',
      successRate: '97.9%',
      specialists: 6,
      equip: 'CO2 Skin Resurfacing Laser, UVB Cabins',
      desc: 'Comprehensive diagnostic screening for melanoma, clinical eczema solutions, psoriasis management, and premium aesthetic dermatological enhancements.',
      treatments: [
        'Full-body digital mole mapping',
        'Acne scar revision & clinical laser treatments',
        'UVB phototherapy for severe psoriasis',
        'Non-invasive cosmetic anti-aging therapies'
      ]
    },
    {
      id: 'oncol',
      name: 'Oncology',
      icon: <Waves className="h-5 w-5" />,
      tagline: 'Hope Cancer Care & Research',
      banner: 'https://images.unsplash.com/photo-1582750433449-64c676ee7424?auto=format&fit=crop&q=80&w=400',
      successRate: '91.8%',
      specialists: 9,
      equip: 'Varian Edge Linac, Chemo Labs',
      desc: 'Providing targeted immunotherapies, precise gene profiling, radiation therapies, and supportive psychological counseling. Coordinated by Dr. Marcus Vance.',
      treatments: [
        'Gene profiling & targeted molecular therapy',
        'Varian Edge linear accelerator radiation',
        'Infusion chemotherapy & blood-cell support',
        'Integrative palliative cancer wellness support'
      ]
    }
  ];

  const activeDept = departments.find(d => d.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Medical Services</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-tight">
          Comprehensive Clinical Departments
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Explore specialized departments utilizing top clinical instruments, dedicated research labs, and senior consultants.
        </p>
      </div>

      {/* Specialty Tabs Selector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <Card hoverEffect={false} className="p-3 bg-white dark:bg-slate-900">
            <div className="flex flex-col gap-2">
              {departments.map((dept) => {
                const isActive = activeTab === dept.id;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setActiveTab(dept.id)}
                    className={`flex items-center gap-3.5 px-4.5 py-3.5 rounded-xl font-display font-bold text-sm text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-primary dark:hover:text-secondary'
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-550 dark:text-slate-400'
                    }`}>
                      {dept.icon}
                    </div>
                    {dept.name}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Dynamic Service Presentation Tab Content */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card hoverEffect={false} className="p-6 sm:p-8 bg-white dark:bg-slate-900 overflow-hidden text-left space-y-6">
                
                {/* Headline Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/40">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary dark:text-secondary uppercase tracking-widest">
                      {activeDept.tagline}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white">
                      {activeDept.name} Division
                    </h2>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Success Rate</p>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">{activeDept.successRate}</p>
                    </div>
                    <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-850" />
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Specialists</p>
                      <p className="font-bold text-slate-700 dark:text-slate-200">{activeDept.specialists} Doctors</p>
                    </div>
                  </div>
                </div>

                {/* Description & List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider">
                      Overview & Operations
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-450 leading-relaxed">
                      {activeDept.desc}
                    </p>
                    {/* Equipment Card */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850/50 space-y-1">
                      <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Diagnostic Equipment</p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{activeDept.equip}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider">
                      Featured Services & Procedures
                    </h3>
                    <ul className="space-y-3.5">
                      {activeDept.treatments.map((trt, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-650 dark:text-slate-350">
                          <ShieldCheck className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                          <span>{trt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Action footer */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-450">Have symptoms? Speak directly to our department coordinator.</p>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Link to={`/booking?specialty=${activeDept.name}`} className="flex-1 sm:flex-none">
                      <Button className="w-full" size="sm" icon={<Calendar className="h-4 w-4" />}>
                        Book Specialist
                      </Button>
                    </Link>
                    <Link to="/doctors" className="flex-1 sm:flex-none">
                      <Button variant="outline" className="w-full" size="sm" icon={<ChevronRight className="h-4 w-4" />}>
                        View Team
                      </Button>
                    </Link>
                  </div>
                </div>

              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Services;
