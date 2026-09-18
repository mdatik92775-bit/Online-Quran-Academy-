import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  BookOpen,
  KeyRound
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

interface AdminLoginGateProps {
  onSuccess?: () => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ onSuccess }) => {
  const { navigateTo, setCurrentUser } = useAcademy();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      if (cleanUser === 'aradmin' && cleanPass === '123456789') {
        localStorage.setItem('oqa_admin_authenticated', 'true');
        setCurrentUser({
          id: 'usr-aradmin',
          name: 'Super Admin (aradmin)',
          email: 'aradmin@onlinequranacademy.org',
          role: 'super_admin',
          phone: '01746349167',
          whatsapp: '01746349167',
          country: 'Bangladesh',
          createdAt: '2026-09-07'
        });
        setIsLoading(false);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setIsLoading(false);
        setError(
          lang === 'bn'
            ? 'ভুল ইউজারনেম বা পাসওয়ার্ড! সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।'
            : 'Invalid username or password! Please check your credentials and try again.'
        );
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setUsername('aradmin');
    setPassword('123456789');
    setError(null);
  };

  const handleOneClickLogin = () => {
    setUsername('aradmin');
    setPassword('123456789');
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('oqa_admin_authenticated', 'true');
      setCurrentUser({
        id: 'usr-aradmin',
        name: 'Super Admin (aradmin)',
        email: 'aradmin@onlinequranacademy.org',
        role: 'super_admin',
        phone: '01746349167',
        whatsapp: '01746349167',
        country: 'Bangladesh',
        createdAt: '2026-09-07'
      });
      setIsLoading(false);
      if (onSuccess) {
        onSuccess();
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Islamic Pattern Motif */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#064E3B 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top action bar */}
      <div className="absolute top-6 left-6 right-6 max-w-4xl mx-auto flex items-center justify-between z-10">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-900 hover:text-emerald-700 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-full border border-emerald-900/10 shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'bn' ? 'ওয়েবসাইটে ফিরে যান' : 'Back to Website'}</span>
        </button>

        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xs p-1 rounded-full border border-emerald-900/10 shadow-xs">
          <button
            onClick={() => setLang('bn')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              lang === 'bn' ? 'bg-[#064E3B] text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              lang === 'en' ? 'bg-[#064E3B] text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full">
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#064E3B] text-white shadow-xl shadow-[#064E3B]/20 border border-[#D4AF37]/40 transform hover:scale-105 transition-transform">
            <BookOpen className="w-8 h-8 text-[#FAF8F2]" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold font-display text-emerald-950 tracking-tight">
              {lang === 'bn' ? 'এডমিন কন্ট্রোল প্যানেল' : 'Admin Control Panel'}
            </h1>
            <p className="text-xs text-emerald-800/80 font-medium">
              {lang === 'bn' 
                ? 'অনলাইন কুরআন একাডেমি • পূর্ণাঙ্গ ম্যানেজমেন্ট ও এডিটিং' 
                : 'Online Quran Academy • Complete Management & CMS'}
            </p>
          </div>
        </div>

        {/* Credentials Info Box */}
        <div className="bg-emerald-900 text-white p-4 rounded-2xl shadow-lg border border-emerald-800 mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
              <KeyRound className="w-4 h-4" />
              <span>{lang === 'bn' ? 'আপনার নির্ধারিত এডমিন লগইন তথ্য' : 'Your Assigned Admin Credentials'}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 font-mono">
              Protected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
              <span className="block text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">
                User Name:
              </span>
              <span className="font-mono font-bold text-[#FAF8F2] text-sm select-all">aradmin</span>
            </div>
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
              <span className="block text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">
                Password:
              </span>
              <span className="font-mono font-bold text-[#FAF8F2] text-sm select-all">123456789</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickFill}
            className="w-full mt-2 py-1.5 px-3 rounded-lg bg-emerald-800/70 hover:bg-emerald-700 text-[#D4AF37] hover:text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'এখানে ক্লিক করে ফর্ম পূরণ করুন' : 'Click to Auto-fill Form'}</span>
          </button>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/5 border border-emerald-900/10 space-y-6">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold">{error}</span>
                <p className="text-[11px] text-rose-700">
                  User Name: <strong>aradmin</strong> | Password: <strong>123456789</strong>
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                {lang === 'bn' ? 'ইউজারনেম (User Name)' : 'Username'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="aradmin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] transition-all bg-[#FAF8F2]/50 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-700">
                  {lang === 'bn' ? 'পাসওয়ার্ড (Password)' : 'Password'}
                </label>
                <span className="text-[10px] text-gray-400">123456789</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="•••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] transition-all bg-[#FAF8F2]/50 placeholder-gray-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-[#064E3B] hover:bg-[#053d2e] active:scale-[0.99] shadow-lg shadow-[#064E3B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>{lang === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Authenticating...'}</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>{lang === 'bn' ? 'এডমিন প্যানেলে লগইন করুন' : 'Sign In to Admin Panel'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOneClickLogin}
                className="w-full py-2.5 px-4 rounded-xl text-emerald-950 font-bold text-xs bg-[#FAF8F2] hover:bg-[#F4F1EA] border border-emerald-900/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'bn' ? 'এক ক্লিকে সরাসরি প্রবেশ করুন (One-Click Login)' : 'One-Click Instant Login'}</span>
              </button>
            </div>
          </form>

          {/* Capabilities note */}
          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-500 leading-relaxed">
              {lang === 'bn' 
                ? 'এডমিন প্যানেল থেকে কোর্স, শিক্ষক, ফি, ফ্রি ট্রায়াল রিকোয়েস্ট, নিবন্ধিত শিক্ষার্থী এবং সকল সাইট সেটিংস পরিবর্তন করতে পারবেন।'
                : 'Access full management for courses, teachers, pricing plans, trial leads, students, and live website CMS settings.'}
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-emerald-900/60 mt-6">
          Online Quran Academy • Secure Administrative Portal
        </p>
      </div>
    </div>
  );
};
