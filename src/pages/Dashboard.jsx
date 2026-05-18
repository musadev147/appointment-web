import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, Heart, Activity, ClipboardList, 
  Trash2, AlertTriangle, ShieldCheck, HeartPulse, CheckCircle2, XCircle,
  FileText, Pill, Plus, Download, Eye, RotateCw, Sparkles, TrendingUp
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { appointmentService } from '../services/appointmentService';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';

const Dashboard = () => {
  const { user } = useAuth();
  
  // States
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  
  // Custom Vitals Logger state
  const [patientVitals, setPatientVitals] = useState([
    { id: 'v-1', label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: <Activity className="h-5 w-5 text-emerald-500" />, desc: 'Normal range', date: 'Today' },
    { id: 'v-2', label: 'Heart Rate', value: '72', unit: 'bpm', icon: <Heart className="h-5 w-5 text-red-500" />, desc: 'Resting beat', date: 'Today' },
    { id: 'v-3', label: 'Weight Index', value: '22.4', unit: 'BMI', icon: <ClipboardList className="h-5 w-5 text-teal-500" />, desc: 'Ideal scale', date: 'Yesterday' },
    { id: 'v-4', label: 'Blood Sugar', value: '95', unit: 'mg/dL', icon: <HeartPulse className="h-5 w-5 text-indigo-500" />, desc: 'Fasting scale', date: 'Today' },
  ]);
  
  // Vitals Logger Form
  const [showLogger, setShowLogger] = useState(false);
  const [logType, setLogType] = useState('Blood Pressure');
  const [logVal, setLogVal] = useState('');
  
  // Mock Prescriptions
  const [prescriptions, setPrescriptions] = useState([
    { id: 'rx-1', name: 'Atorvastatin 20mg', instructions: '1 tablet daily before sleeping', doctor: 'Dr. Alexander Thorne', refills: 3, status: 'Active' },
    { id: 'rx-2', name: 'Lisinopril 10mg', instructions: '1 tablet every morning', doctor: 'Dr. Marcus Vance', refills: 2, status: 'Active' },
    { id: 'rx-3', name: 'Amoxicillin 500mg', instructions: '1 capsule 3 times daily after meals', doctor: 'Dr. Sarah Jenkins', refills: 0, status: 'Completed' },
  ]);
  const [refillLoadingId, setRefillLoadingId] = useState(null);

  // Mock Lab Reports
  const [labReports, setLabReports] = useState([
    { id: 'lab-1', test: 'Complete Blood Count (CBC)', date: 'May 10, 2026', doctor: 'Dr. Sarah Jenkins', status: 'Ready', values: { 'Red Blood Cells (RBC)': '4.8 M/uL (Normal: 4.2-5.4)', 'White Blood Cells (WBC)': '6.5 K/uL (Normal: 4.5-11.0)', 'Platelets Count': '250 K/uL (Normal: 150-450)', 'Hemoglobin Level': '14.2 g/dL (Normal: 12.0-16.0)' } },
    { id: 'lab-2', test: 'Comprehensive Lipid Panel', date: 'May 12, 2026', doctor: 'Dr. Alexander Thorne', status: 'Ready', values: { 'Total Cholesterol': '180 mg/dL (Normal: <200)', 'HDL (Good Cholesterol)': '55 mg/dL (Normal: >50)', 'LDL (Bad Cholesterol)': '105 mg/dL (Normal: <100)', 'Triglycerides Levels': '120 mg/dL (Normal: <150)' } },
    { id: 'lab-3', test: 'Thyroid Function T3/T4', date: 'May 18, 2026', doctor: 'Dr. Julian Vance', status: 'Under Review', values: null },
  ]);
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchAppointmentsData = async () => {
    setLoading(true);
    try {
      const data = await appointmentService.getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsData();
  }, []);

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this scheduled appointment?')) return;
    
    setCancellingId(id);
    try {
      await appointmentService.cancelAppointment(id);
      const updated = await appointmentService.getAppointments();
      setAppointments(updated);
    } catch (err) {
      alert('Failed to cancel appointment: ' + err.message);
    } finally {
      setCancellingId(null);
    }
  };

  // Prescription refill request handler
  const handleRefillRequest = async (id) => {
    setRefillLoadingId(id);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setPrescriptions(prev => prev.map(rx => {
        if (rx.id === id) {
          if (rx.refills > 0) {
            alert(`Refill request for ${rx.name} successfully submitted to ${rx.doctor}! Remaining refills: ${rx.refills - 1}`);
            return { ...rx, refills: rx.refills - 1 };
          } else {
            alert('Refill request failed: No refills remaining. Please contact your clinician.');
          }
        }
        return rx;
      }));
    } catch (err) {
      alert('Refill transaction failed.');
    } finally {
      setRefillLoadingId(null);
    }
  };

  // Vitals custom logger handler
  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (!logVal) return;

    let targetIcon = <Activity className="h-5 w-5 text-emerald-500" />;
    let targetUnit = '';
    let targetDesc = 'Logged value';

    if (logType === 'Blood Pressure') {
      targetUnit = 'mmHg';
      targetDesc = 'Logged BP';
      targetIcon = <Activity className="h-5 w-5 text-emerald-500" />;
    } else if (logType === 'Heart Rate') {
      targetUnit = 'bpm';
      targetDesc = 'Logged pulse';
      targetIcon = <Heart className="h-5 w-5 text-red-500" />;
    } else if (logType === 'Weight Index') {
      targetUnit = 'BMI';
      targetDesc = 'Logged index';
      targetIcon = <ClipboardList className="h-5 w-5 text-teal-500" />;
    } else if (logType === 'Blood Sugar') {
      targetUnit = 'mg/dL';
      targetDesc = 'Logged sugar';
      targetIcon = <HeartPulse className="h-5 w-5 text-indigo-500" />;
    }

    setPatientVitals(prev => prev.map(vt => {
      if (vt.label === logType) {
        return {
          ...vt,
          value: logVal,
          unit: targetUnit,
          desc: targetDesc,
          date: 'Just now'
        };
      }
      return vt;
    }));

    setLogVal('');
    setShowLogger(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
      
      {/* 1. Welcoming Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-teal-800 to-teal-950 p-6 sm:p-8 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-bold text-teal-200">
              <Sparkles className="h-4 w-4" /> HIPAA Certified Patient Gate
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Welcome Back, {user?.name}!
            </h1>
            <p className="text-sm text-teal-100/80 max-w-xl">
              Access your medical prescription logs, schedule clinical consults, view lab results, and review diagnostic charts all from one single unified dashboard.
            </p>
          </div>
          
          <Link to="/booking" className="shrink-0">
            <Button variant="secondary" size="md" icon={<Calendar className="h-4.5 w-4.5" />}>
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Unified Navigation Tabs */}
      <div className="flex flex-wrap border-b border-slate-100 dark:border-slate-800/40 gap-2 pb-1">
        {[
          { id: 'overview', label: 'Overview & Vitals', count: null },
          { id: 'appointments', label: 'Consultations', count: appointments.filter(a => a.status === 'upcoming').length || null },
          { id: 'prescriptions', label: 'Active Medications', count: prescriptions.filter(p => p.status === 'Active').length || null },
          { id: 'labs', label: 'Laboratory Reports', count: labReports.filter(l => l.status === 'Ready').length || null },
        ].map((tb) => {
          const isActive = activeSubTab === tb.id;
          return (
            <button
              key={tb.id}
              onClick={() => setActiveSubTab(tb.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-display font-bold text-sm transition-all cursor-pointer ${
                isActive
                  ? 'border-primary text-primary dark:text-secondary'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-350'
              }`}
            >
              {tb.label}
              {tb.count !== null && (
                <span className="px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/20 text-[10px] font-bold text-primary dark:text-secondary">
                  {tb.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Dynamic Tab Content */}
      <div className="space-y-6">
        
        {/* Tab A: Overview & Vitals */}
        {activeSubTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header with logger trigger */}
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Active Health Indicators</h3>
                <p className="text-xs text-slate-400">Review your recently recorded blood pressure, sugar logs, and vitals.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<Plus className="h-4 w-4" />}
                onClick={() => setShowLogger(!showLogger)}
              >
                {showLogger ? 'Hide Logger' : 'Log New Vital'}
              </Button>
            </div>

            {/* Vitals Logger Form Modal Overlay inside screen */}
            <AnimatePresence>
              {showLogger && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <Card hoverEffect={false} className="p-5 border border-teal-100 dark:border-teal-900/30 bg-teal-500/5">
                    <form onSubmit={handleLogSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-bold text-slate-650 dark:text-slate-350">Select Vitals Type</label>
                        <select
                          value={logType}
                          onChange={(e) => setLogType(e.target.value)}
                          className="w-full pl-3 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="Blood Pressure">Blood Pressure (mmHg)</option>
                          <option value="Heart Rate">Heart Rate (bpm)</option>
                          <option value="Weight Index">Weight Index (BMI)</option>
                          <option value="Blood Sugar">Blood Sugar (mg/dL)</option>
                        </select>
                      </div>

                      <Input
                        id="logVal"
                        label={`Recorded Value (${logType === 'Blood Pressure' ? 'mmHg' : logType === 'Heart Rate' ? 'bpm' : logType === 'Weight Index' ? 'BMI' : 'mg/dL'})`}
                        placeholder="Ex. 120/80 or 75"
                        value={logVal}
                        onChange={(e) => setLogVal(e.target.value)}
                        required
                        className="py-2.5 text-xs"
                      />

                      <Button type="submit" size="sm" className="w-full">
                        Save to Logs
                      </Button>
                    </form>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Vitals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {patientVitals.map((vt) => (
                <Card key={vt.id} hoverEffect={false} className="p-5 flex items-center gap-4 bg-white dark:bg-slate-900">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-850 flex items-center justify-center shrink-0">
                    {vt.icon}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{vt.label}</p>
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[8px] text-slate-450">{vt.date}</span>
                    </div>
                    <p className="text-lg font-extrabold text-slate-800 dark:text-white">
                      {vt.value} <span className="text-xs font-normal text-slate-400">{vt.unit}</span>
                    </p>
                    <p className="text-[10px] text-slate-450 dark:text-slate-500">{vt.desc}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Core Health Tips block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card hoverEffect={false} className="p-5 bg-white dark:bg-slate-900 border flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">Daily Health Tip</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                    Based on your active Blood Pressure log (120/80 mmHg), you are in the ideal systolic range. Maintain active hydration and reduce sodium limits to preserve cardiovascular flexibility.
                  </p>
                </div>
              </Card>

              <Card hoverEffect={false} className="p-5 bg-white dark:bg-slate-900 border flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">HIPAA Protection Profile</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                    All medical vitals and logged data points are stored in an encrypted sandboxed state. Only board-certified clinicians bound to your consultation file hold credential authorization to review these files.
                  </p>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Tab B: Consultations List */}
        {activeSubTab === 'appointments' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="space-y-0.5 mb-6">
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Clinical Bookings Timeline</h3>
              <p className="text-xs text-slate-400">Review upcoming schedules, check times, or request cancellation coordinates.</p>
            </div>

            {loading ? (
              <div className="py-16 text-center flex flex-col items-center gap-3">
                <RotateCw className="h-8 w-8 text-primary animate-spin" />
                <p className="text-xs text-slate-450">Syncing consultations database...</p>
              </div>
            ) : appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((apt) => {
                  const isUpcoming = apt.status === 'upcoming';
                  const isCompleted = apt.status === 'completed';
                  const isCancelled = apt.status === 'cancelled';

                  return (
                    <Card key={apt.id} hoverEffect={false} className="p-5 bg-white dark:bg-slate-900 border">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                            isUpcoming ? 'bg-teal-50 dark:bg-teal-950/20 text-primary dark:text-secondary' :
                            isCompleted ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' :
                            'bg-red-50 dark:bg-red-950/20 text-red-500'
                          }`}>
                            {isUpcoming ? <Calendar className="h-6 w-6" /> :
                             isCompleted ? <CheckCircle2 className="h-6 w-6" /> :
                             <XCircle className="h-6 w-6" />}
                          </div>

                          <div className="space-y-1 text-left">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-800 dark:text-white">
                                {apt.doctorName}
                              </h3>
                              <span className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                {apt.specialty}
                              </span>
                            </div>
                            
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              <strong>Patient:</strong> {apt.patientName} | <strong>Reason:</strong> {apt.reason}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 text-[11px] text-slate-450 pt-1">
                              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {apt.date}</span>
                              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {apt.timeSlot || apt.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-dashed border-slate-100 dark:border-slate-850/50">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase">Status</p>
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase mt-1 ${
                              isUpcoming ? 'bg-teal-50 dark:bg-teal-950/20 text-primary dark:text-secondary' :
                              isCompleted ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' :
                              'bg-red-50 dark:bg-red-950/20 text-red-500'
                            }`}>
                              {apt.status}
                            </span>
                          </div>

                          {isUpcoming && (
                            <Button
                              variant="danger"
                              size="sm"
                              loading={cancellingId === apt.id}
                              onClick={() => handleCancelAppointment(apt.id)}
                              className="px-3 py-1.5 text-xs font-bold"
                              icon={<Trash2 className="h-3.5 w-3.5" />}
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </div>

                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card hoverEffect={false} className="p-8 text-center border-dashed flex flex-col items-center gap-4">
                <ClipboardList className="h-10 w-10 text-slate-350" />
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white">No Appointments Listed</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                  Choose from our expert medical specialists and reserve a consultation slot.
                </p>
                <Link to="/booking">
                  <Button size="sm">Schedule Clinical Consult</Button>
                </Link>
              </Card>
            )}
          </motion.div>
        )}

        {/* Tab C: Prescriptions Refills Manager */}
        {activeSubTab === 'prescriptions' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-0.5">
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Active Prescriptions</h3>
              <p className="text-xs text-slate-400">Coordinate your prescribed pharmaceuticals and instantly request refill clearances.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prescriptions.map((rx) => {
                const isCompleted = rx.refills === 0;
                return (
                  <Card key={rx.id} hoverEffect={false} className="p-5 bg-white dark:bg-slate-900 border text-left flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
                            <Pill className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 dark:text-white">{rx.name}</h4>
                            <p className="text-[10px] text-slate-400">Prescribed by {rx.doctor}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-teal-50 dark:bg-teal-950/20 text-primary dark:text-secondary'
                        }`}>
                          {rx.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-550 dark:text-slate-400 leading-normal pl-1">
                        <strong>Dosing:</strong> {rx.instructions}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-850/50 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] text-slate-400">Refills Remaining</p>
                        <p className="text-xs font-bold text-slate-850 dark:text-slate-200">
                          {rx.refills === 0 ? 'No Refills (Require Consult)' : `${rx.refills} refills left`}
                        </p>
                      </div>

                      <Button
                        variant={rx.refills === 0 ? 'outline' : 'primary'}
                        size="sm"
                        disabled={rx.refills === 0}
                        loading={refillLoadingId === rx.id}
                        onClick={() => handleRefillRequest(rx.id)}
                        className="text-xs font-bold px-3 py-1.5 shrink-0"
                      >
                        {rx.refills === 0 ? 'Renew Refills' : 'Request Refill'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tab D: Laboratory Reports */}
        {activeSubTab === 'labs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-0.5">
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Hematology & Diagnostic Labs</h3>
              <p className="text-xs text-slate-400">Access and download verified laboratory reports compiled by clinical laboratories.</p>
            </div>

            <div className="space-y-4">
              {labReports.map((lb) => {
                const isReady = lb.status === 'Ready';
                return (
                  <Card key={lb.id} hoverEffect={false} className="p-5 bg-white dark:bg-slate-900 border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-left">
                      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 animate-pulse">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 dark:text-white">{lb.test}</h4>
                        <p className="text-[10px] text-slate-400">Date: {lb.date} | Requesting Doctor: {lb.doctor}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        isReady ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-100 dark:border-emerald-900/30' : 
                        'bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-100 dark:border-amber-900/30'
                      }`}>
                        {lb.status}
                      </span>

                      {isReady && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<Eye className="h-4 w-4" />}
                            onClick={() => setSelectedReport(lb)}
                            className="px-3 py-1.5 text-xs font-bold"
                          >
                            View Report
                          </Button>
                          <a href="#" onClick={(e) => { e.preventDefault(); alert('Report download initiated safely.'); }} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors">
                            <Download className="h-4 w-4 text-slate-500" />
                          </a>
                        </>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>

      {/* 4. Interactive Lab Report Modal Overlay */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative max-h-[85vh] overflow-y-auto shadow-2xl text-left space-y-6"
            >
              {/* Close trigger */}
              <button
                onClick={() => setSelectedReport(null)}
                className="absolute right-4 top-4 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <XCircle className="h-6 w-6" />
              </button>

              {/* Modal header */}
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/40 pb-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-primary uppercase">Lab Report Details</span>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-800 dark:text-white">
                    {selectedReport.test}
                  </h3>
                </div>
              </div>

              {/* Lab details coordinates */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-850/50">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Date of Release</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{selectedReport.date}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Reviewing Clinician</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{selectedReport.doctor}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Record Reference ID</p>
                  <p className="font-mono text-slate-700 dark:text-slate-200">MS-{selectedReport.id.toUpperCase()}-2026</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Status Code</p>
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 font-bold text-[9px] uppercase">
                    {selectedReport.status}
                  </span>
                </div>
              </div>

              {/* Lab Values Table */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider">Diagnostic Metric Readings</h4>
                <div className="space-y-2.5">
                  {selectedReport.values && Object.entries(selectedReport.values).map(([metric, reading], index) => (
                    <div key={index} className="flex items-center justify-between gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-850/30 text-xs">
                      <span className="font-semibold text-slate-600 dark:text-slate-350">{metric}</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-white">{reading}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal action buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/40 flex gap-3">
                <Button onClick={() => { alert('Report PDF download initialized.'); setSelectedReport(null); }} className="flex-1" icon={<Download className="h-4.5 w-4.5" />}>
                  Download Official PDF
                </Button>
                <Button variant="outline" onClick={() => setSelectedReport(null)} className="flex-1">
                  Close Review
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Support HIPAA certifications labels */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-center gap-6 text-[10px] text-slate-400">
        <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Secure HIPAA Logs</span>
        <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Encrypted Health Files</span>
      </div>
    </div>
  );
};

export default Dashboard;
