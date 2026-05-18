import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShieldCheck, HeartPulse, Sparkles, Award, Star, Compass, Target, Users, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const About = () => {
  const stats = [
    { value: '15k+', label: 'Successful Operations', desc: 'Complex surgical therapies coordinated safely', icon: <HeartPulse className="h-6 w-6 text-teal-500" /> },
    { value: '120k+', label: 'Recovered Patients', desc: 'Active outpatient files and clinical records', icon: <Users className="h-6 w-6 text-emerald-500" /> },
    { value: '98.8%', label: 'Clinical Rating', desc: 'Patient feedback satisfaction reviews', icon: <Star className="h-6 w-6 text-amber-500" /> },
    { value: '140+', label: 'Published Research', desc: 'Clinical research papers in medical journals', icon: <BookOpen className="h-6 w-6 text-indigo-500" /> },
  ];

  const values = [
    {
      title: 'Patient Centered Care',
      desc: 'Our protocols place the patient at the absolute center of decisions, ensuring total comfort, transparency, and dignity.',
      icon: <Compass className="h-5 w-5 text-teal-600" />,
    },
    {
      title: 'Board Certified Excellence',
      desc: 'Our staff consists of double-board-certified clinicians dedicated to continuous education and advanced surgical certifications.',
      icon: <Award className="h-5 w-5 text-emerald-600" />,
    },
    {
      title: 'Scientific Innovations',
      desc: 'MedSphere maintains high investment in cutting-edge laboratory tools, surgical robots, and diagnostic technologies.',
      icon: <Sparkles className="h-5 w-5 text-purple-600" />,
    },
  ];

  const milestones = [
    {
      year: '2011',
      title: 'MedSphere Hospital Founded',
      desc: 'Opened our main central multi-specialty clinical facility with 150 beds and 30 board consultants.'
    },
    {
      year: '2015',
      title: 'Digital Health Hub Launch',
      desc: 'Digitized all medical workflows, launched an integrated patient booking portal, and introduced paperless health files.'
    },
    {
      year: '2019',
      title: 'Advanced Robotic Surgery Wing',
      desc: 'Established our surgical wing with Stryker orthopedic and Siemens cardiological surgical robots, elevating precision.'
    },
    {
      year: '2024',
      title: 'Oncology Immunotherapy Research Lab',
      desc: 'Launched an advanced clinical center for genetic sequencing and targeted immunotherapies.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Hero Headline Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Hospital Identity</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-tight">
            Pioneering Medical Excellence Since 2011
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            At MedSphere, our mission is to redefine healthcare metrics through compassionate medical therapy, high-end diagnostics, and state-of-the-art clinical resources. We believe that professional wellness requires collaborative care and scientific advancements.
          </p>
          <div className="flex gap-4">
            <Link to="/booking">
              <Button size="lg" icon={<Calendar className="h-5 w-5" />}>
                Book Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Office
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl blur-2xl -z-10" />
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 aspect-[4/3] w-full max-w-[440px] bg-slate-100 dark:bg-slate-800">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=500"
              alt="MedSphere Diagnostic Labs"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Grid of Key Statistics */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold text-primary dark:text-secondary uppercase tracking-widest">Clinic Metrics</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800 dark:text-white">Our Clinic Performance at a Glance</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((st, idx) => (
            <Card key={idx} className="text-left p-6 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-slate-850 flex items-center justify-center">
                {st.icon}
              </div>
              <div className="space-y-1">
                <p className="font-display font-extrabold text-3xl text-slate-800 dark:text-white">{st.value}</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">{st.label}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal">{st.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/40 py-16 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Our Ideology</span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white leading-tight">Values Driving Healthcare Quality</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Our teams operate on core professional standards ensuring a safe, supportive, and efficient environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((vl, idx) => (
            <Card key={idx} className="text-left bg-white dark:bg-slate-950 p-6 flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center">
                {vl.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">{vl.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{vl.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Milestone Timeline */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Our Milestones</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800 dark:text-white">Tracing Our Growth & Achievements</h2>
        </div>

        {/* Timeline Line */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Vertical Divider line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800 pointer-events-none transform sm:-translate-x-1/2" />
          
          <div className="space-y-12">
            {milestones.map((ml, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col sm:flex-row items-start ${isEven ? 'sm:justify-start' : 'sm:justify-end'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-[11px] sm:left-1/2 top-1.5 h-3.5 w-3.5 rounded-full bg-primary border-4 border-slate-50 dark:border-slate-900 pointer-events-none transform sm:-translate-x-1/2" />
                  
                  {/* Content Container */}
                  <div className={`w-full sm:w-[45%] pl-8 sm:pl-0 ${isEven ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'}`}>
                    <Card hoverEffect={false} className="p-5 text-left inline-block w-full">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold tracking-wider mb-2">
                        {ml.year}
                      </span>
                      <h3 className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-white mb-2">{ml.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ml.desc}</p>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
