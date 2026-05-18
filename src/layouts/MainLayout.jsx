import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-200/10 dark:bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-0 w-[400px] h-[400px] bg-emerald-200/10 dark:bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Navbar */}
      <Navbar />

      {/* Page Body content */}
      <main className="flex-grow pt-24 pb-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
