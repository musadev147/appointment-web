import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, AlertTriangle, HeartPulse } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card } from '../components/ui/Card';

// Validation Schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the HIPAA privacy guidelines' }),
  }),
});

const Auth = () => {
  const { login, register: authRegister, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectPath = searchParams.get('redirect') || '/dashboard';
  const preSelectedDocId = searchParams.get('doctorId');

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      const target = preSelectedDocId ? `/${redirectPath}?doctorId=${preSelectedDocId}` : redirectPath;
      navigate(target);
    }
  }, [isAuthenticated, navigate, redirectPath, preSelectedDocId]);

  // Hook Forms
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignupForm,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      await login(data.email, data.password);
      const target = preSelectedDocId ? `/${redirectPath}?doctorId=${preSelectedDocId}` : redirectPath;
      navigate(target);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email credentials or password.');
    } finally {
      setLoading(false);
    }
  };

  const onSignupSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      await authRegister(data.name, data.email, data.password);
      const target = preSelectedDocId ? `/${redirectPath}?doctorId=${preSelectedDocId}` : redirectPath;
      navigate(target);
    } catch (err) {
      setErrorMsg(err.message || 'Registration transaction failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMsg('');
    resetLoginForm();
    resetSignupForm();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* Brand Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex h-12 w-12 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 items-center justify-center text-primary mb-2">
          <HeartPulse className="h-7 w-7 text-primary dark:text-secondary" />
        </div>
        <h1 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white">
          Access Patient Portal
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage clinical appointments, review lab reports, and contact doctors.
        </p>
      </div>

      <Card hoverEffect={false} className="bg-white dark:bg-slate-900 border p-6 text-left relative overflow-hidden">
        {/* Background glowing decorations */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-teal-500/5 rounded-full blur-[60px] pointer-events-none" />

        {/* Tab triggers */}
        <div className="flex bg-slate-50 dark:bg-slate-950/40 p-1.5 rounded-xl border border-slate-100 dark:border-slate-800/40 mb-6">
          <button
            onClick={() => handleTabChange('login')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white dark:bg-slate-900 text-primary dark:text-secondary shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => handleTabChange('register')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white dark:bg-slate-900 text-primary dark:text-secondary shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error notification banner */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-150 dark:border-red-900/30 text-xs font-semibold text-red-500 flex items-center gap-2 mb-6">
            <AlertTriangle className="h-4.5 w-4.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Dynamic Form Tabs */}
        <AnimatePresence mode="wait">
          {activeTab === 'login' ? (
            <motion.form
              key="login-form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleLoginSubmit(onLoginSubmit)}
              className="space-y-5"
            >
              <Input
                id="email"
                type="email"
                label="Email Address"
                icon={<Mail className="h-4.5 w-4.5" />}
                placeholder="name@email.com"
                error={loginErrors.email?.message}
                {...loginRegister('email')}
              />

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Security Password"
                  icon={<Lock className="h-4.5 w-4.5" />}
                  placeholder="••••••••"
                  error={loginErrors.password?.message}
                  {...loginRegister('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-10 text-slate-400 dark:text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Demo credentials tip */}
              <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/10 border border-teal-100 dark:border-teal-900/20 text-[10px] text-teal-700 dark:text-teal-400 leading-normal">
                💡 <strong>Demo Credentials:</strong> Use any email with at least a 6-character password to easily test the portal logic. (Ex. <code>patient@medsphere.com</code> / <code>password123</code>)
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                Access Patient Portal
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="register-form"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignupSubmit(onSignupSubmit)}
              className="space-y-5"
            >
              <Input
                id="reg-name"
                label="Patient Full Name"
                icon={<User className="h-4.5 w-4.5" />}
                placeholder="Ex. Jane Doe"
                error={signupErrors.name?.message}
                {...signupRegister('name')}
              />

              <Input
                id="reg-email"
                type="email"
                label="Email Address"
                icon={<Mail className="h-4.5 w-4.5" />}
                placeholder="name@email.com"
                error={signupErrors.email?.message}
                {...signupRegister('email')}
              />

              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Create Security Password"
                  icon={<Lock className="h-4.5 w-4.5" />}
                  placeholder="Min 6 characters"
                  error={signupErrors.password?.message}
                  {...signupRegister('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-10 text-slate-400 dark:text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Accept guidelines checkbox */}
              <div className="flex flex-col gap-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-450 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="mt-0.5 rounded border-slate-350 dark:border-slate-800 text-primary focus:ring-primary h-4 w-4"
                    {...signupRegister('acceptTerms')}
                  />
                  <span>
                    I accept and consent to the secure HIPAA medical data disclosure policy and privacy terms.
                  </span>
                </label>
                {signupErrors.acceptTerms && (
                  <span className="text-[11px] text-red-500 font-medium pl-6">
                    {signupErrors.acceptTerms.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                Register Health Account
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Security validation badges */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-center gap-6 text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> HIPAA Compliant</span>
          <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Secure SSL</span>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
