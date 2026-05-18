import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, MapPin, Send, ShieldAlert } from 'lucide-react';
import Button from './ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our MedSphere newsletter!');
    e.target.reset();
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-secondary">
                <HeartPulse className="h-6 w-6 text-secondary" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                Med<span className="text-secondary">Sphere</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">
              Empowering healthcare excellence with premium, patient-first clinical services, virtual diagnostics, and expert specialists.
            </p>
            {/* Urgent Care Card */}
            <div className="flex items-center gap-3 bg-red-950/20 border border-red-900/30 rounded-xl p-3.5 mt-2">
              <ShieldAlert className="h-5 w-5 text-red-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-wide">24/7 Emergency Line</p>
                <a href="tel:18005550199" className="text-sm font-bold text-white hover:text-red-400 transition-colors">
                  +1 (800) 555-0199
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-secondary transition-colors">Search Doctors</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-secondary transition-colors">Book Appointment</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-secondary transition-colors">Medical Services</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors">About Hospital</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Medical Services */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-6">Our Specialties</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-secondary transition-colors">Cardiovascular Care</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-secondary transition-colors">Pediatrics & Neonatal</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-secondary transition-colors">Advanced Neurology</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-secondary transition-colors">Orthopedics & Spine</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-secondary transition-colors">Clinical Dermatology</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-secondary transition-colors">Targeted Oncology</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-2">Weekly Newsletter</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Stay up to date with medical advances, health guidelines, and doctor availability.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {/* Social icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} MedSphere Healthcare Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
