import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, ShieldAlert, 
  CheckCircle2, AlertTriangle, Building, Stethoscope 
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill out all required fields.');
      return;
    }

    setFormError('');
    setSubmitting(true);
    
    // Simulate server transaction
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setFormError('Failed to transmit message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: 'Urgent Care & Emergency',
      info: '+1 (800) 555-0199',
      desc: '24/7 priority triage response hotlines.',
      icon: <ShieldAlert className="h-5 w-5 text-red-500" />,
      color: 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400',
    },
    {
      title: 'Clinical Appointments',
      info: '+1 (555) 019-2834',
      desc: 'Mon - Fri, 8:00 AM - 5:00 PM.',
      icon: <Stethoscope className="h-5 w-5 text-teal-500" />,
      color: 'bg-teal-50 dark:bg-teal-950/20 border-teal-100 dark:border-teal-900/30 text-teal-700 dark:text-teal-400',
    },
    {
      title: 'Office Address',
      info: '450 Health Sciences Way',
      desc: 'Suite 200, Medical Plaza, SF, CA.',
      icon: <MapPin className="h-5 w-5 text-indigo-500" />,
      color: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    },
    {
      title: 'Email Correspondence',
      info: 'support@medsphere.com',
      desc: 'Queries resolved within 24 hours.',
      icon: <Mail className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-400',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest">Contact Support</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-tight">
          Connect with MedSphere
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Need scheduling assistance, billing information, or clinical details? Get in touch with our division offices or dispatch emergency teams.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column info panels */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactMethods.map((cm, idx) => (
              <Card key={idx} hoverEffect={false} className={`p-5 flex flex-col gap-4 border ${cm.color}`}>
                <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                  {cm.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">{cm.title}</h3>
                  <p className="text-sm font-extrabold tracking-tight">{cm.info}</p>
                  <p className="text-[10px] opacity-75 leading-relaxed">{cm.desc}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Interactive Map Box Mockup */}
          <Card hoverEffect={false} className="p-4 bg-white dark:bg-slate-900 overflow-hidden relative aspect-[4/3] flex flex-col justify-end">
            {/* Mock Map Background Layer */}
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 bg-grid-pattern opacity-40 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 pointer-events-none">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center animate-ping absolute" />
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center relative shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-white/95 dark:bg-slate-900 px-3 py-1 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
                MedSphere Plaza, SF, CA
              </span>
            </div>
            
            {/* Quick directions tag */}
            <div className="relative glass-light dark:glass-dark p-3.5 rounded-xl border flex items-center justify-between text-xs z-10">
              <div className="text-left space-y-0.5">
                <p className="font-bold text-slate-800 dark:text-white">Main Plaza Admission</p>
                <p className="text-[10px] text-slate-400">Validated parking available in Gate B.</p>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold tracking-wide transition-colors"
              >
                Directions
              </a>
            </div>
          </Card>
        </div>

        {/* Right column form */}
        <Card hoverEffect={false} className="lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-slate-900 text-left">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-white">Inquiry Received</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for writing to MedSphere. Our staff coordinates clinic routing, and a liaison will respond to your e-mail shortly.
                </p>
              </div>
              <Button onClick={() => setSuccess(false)} variant="outline" size="sm">
                Write Another Message
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white">Submit Support Inquiry</h2>
                <p className="text-xs text-slate-400">Fill in the fields, and our patient-liaison offices will review details promptly.</p>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-xs font-semibold text-red-500 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="name"
                  name="name"
                  label="Full Name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-350">Topic Division</label>
                <div className="relative flex items-center">
                  <Building className="absolute left-4 h-4.5 w-4.5 text-slate-400" />
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="General Inquiry">General Clinic Inquiry</option>
                    <option value="Billing Details">Billing & Accounting Support</option>
                    <option value="Medical Records">Electronic Medical Records Office</option>
                    <option value="Department Coordinator">Department Specialty Coordinating</option>
                    <option value="Technical Support">Portal Technical Feedback</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-350">Message Body</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Detail your inquiry, questions, or medical record review numbers..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <Button
                type="submit"
                loading={submitting}
                className="w-full sm:w-auto"
                icon={<Send className="h-4.5 w-4.5" />}
              >
                Send Support Inquiry
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Contact;
